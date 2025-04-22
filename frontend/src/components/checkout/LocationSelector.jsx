import React, {useState, useEffect, useCallback} from 'react';
import addressService from '../../services/addressService';
import { toTitleCase } from '../../utils/formatters';
const LocationSelector = ({onChange}) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState({});
    const [selectedDistrict, setSelectedDistrict] = useState({});
    const [selectedWard, setSelectedWard] = useState({});

    const [isLoading, setIsLoading] = useState({
        provinces: false,
        districts: false,
        wards: false
    });

    const [error, setError] = useState({
        provinces: null,
        districts: null,
        wards: null
    });

    // Transform API response to consistent format
    const transformData = (data, ID, NAME) => {
        if (!data) return [];
        if (Array.isArray(data)) {
            return data.map(item => ({
                id: item[ID] || '',
                name: toTitleCase(item[NAME]) || ''
            }));
        }
        return [];
    };

    // Fetch provinces on component mount
    useEffect(() => {
        const fetchProvinces = async () => {
            setIsLoading(prev => ({...prev, provinces: true}));
            setError(prev => ({...prev, provinces: null}));
            try {
                const response = await addressService.getProvinces();
                const transformedData = transformData(response.data.data, 'PROVINCE_ID', 'PROVINCE_NAME');
                setProvinces(transformedData);
            } catch (error) {
                console.error('Error fetching provinces:', error);
                setError(prev => ({
                    ...prev,
                    provinces: 'Failed to load provinces. Please try again.'
                }));
                setProvinces([]);
            } finally {
                setIsLoading(prev => ({...prev, provinces: false}));
            }
        };

        fetchProvinces();
    }, []);

    // Fetch districts when province changes
    useEffect(() => {
        const fetchDistricts = async () => {
            if (!selectedProvince) {
                setDistricts([]);
                return;
            }

            setIsLoading(prev => ({...prev, districts: true}));
            setError(prev => ({...prev, districts: null}));
            try {
                const response = await addressService.getDistricts(selectedProvince.id);
                const transformedData = transformData(response.data.data, 'DISTRICT_ID', 'DISTRICT_NAME');
                setDistricts(transformedData);
                setSelectedDistrict('');
                setSelectedWard('');
            } catch (error) {
                console.error('Error fetching districts:', error);
                setError(prev => ({
                    ...prev,
                    districts: 'Failed to load districts. Please try again.'
                }));
                setDistricts([]);
            } finally {
                setIsLoading(prev => ({...prev, districts: false}));
            }
        };

        fetchDistricts();
    }, [selectedProvince]);

    // Fetch wards when district changes
    useEffect(() => {
        const fetchWards = async () => {
            if (!selectedDistrict) {
                setWards([]);
                return;
            }

            setIsLoading(prev => ({...prev, wards: true}));
            setError(prev => ({...prev, wards: null}));
            try {
                const response = await addressService.getWards(selectedDistrict.id);
                const transformedData = transformData(response.data.data, 'WARDS_ID', 'WARDS_NAME');
                setWards(transformedData);
                setSelectedWard('');
            } catch (error) {
                console.error('Error fetching wards:', error);
                setError(prev => ({
                    ...prev,
                    wards: 'Failed to load wards. Please try again.'
                }));
                setWards([]);
            } finally {
                setIsLoading(prev => ({...prev, wards: false}));
            }
        };

        fetchWards();
    }, [selectedDistrict]);

    // Memoize the onChange callback
    const handleChange = useCallback(() => {
        if (selectedProvince || selectedDistrict || selectedWard) {
            onChange({
                province: selectedProvince,
                district: selectedDistrict,
                ward: selectedWard
            });
        }
    }, [selectedProvince, selectedDistrict, selectedWard]);

    // Update parent component when selections change
    useEffect(() => {
        handleChange();
    }, [handleChange]);

    const SelectBox = ({
                           value,
                           onChange,
                           options = [],
                           placeholder,
                           isLoading,
                           disabled,
                           error
                       }) => {
    
        return (
            <div className="relative">
                <select
                    key={value?.id}
                    value={value?.id || ''}
                    onChange={(e) => {
                        const selectedOption = options.find(opt => String(opt.id) === String(e.target.value));
                        if (selectedOption) {
                            onChange(selectedOption);
                        }
                    }}
                    disabled={disabled || isLoading}
                    required
                    className={`
          w-full px-2.5 py-2.5 rounded-lg border
          ${disabled ? 'bg-gray-50 text-gray-500' : 'bg-white text-gray-900'}
          ${isLoading ? 'animate-pulse' : ''}
          ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}
          focus:ring-1 ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}
          disabled:cursor-not-allowed
        `}
                >
                    <option value="">
                        {isLoading ? 'Loading...' : error ? 'Error loading data' : placeholder}
                    </option>
                    {options && options.map(option => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
                {isLoading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    };

    return (
        <div className=" grid grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Province/City
                </label>
                <SelectBox
                    value={selectedProvince}
                    onChange={(option) => {
                        setSelectedProvince(option);
                    }}
                    options={provinces}
                    placeholder="Select province/city"
                    isLoading={isLoading.provinces}
                    error={error.provinces}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    District
                </label>
                <SelectBox
                    value={selectedDistrict}
                    onChange={(option) => {
                        setSelectedDistrict(option);
                    }}
                    options={districts}
                    placeholder="Select district"
                    isLoading={isLoading.districts}
                    disabled={!selectedProvince}
                
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ward
                </label>
                <SelectBox
                    value={selectedWard}
                    onChange={(option) => {
                        setSelectedWard(option);
                    }}
                    options={wards}
                    placeholder="Select ward"
                    isLoading={isLoading.wards}
                    disabled={!selectedDistrict}
                        
                />
            </div>
        </div>
    );
};

export default LocationSelector; 