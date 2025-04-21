import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';

const LocationSelector = ({onChange}) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');

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
    const transformData = (data) => {
        if (!data) return [];
        if (Array.isArray(data)) {
            return data.map(item => ({
                code: item.code || item.id || item.value || '',
                name: item.name || item.label || ''
            }));
        }
        if (typeof data === 'object') {
            return Object.entries(data).map(([code, name]) => ({
                code,
                name: typeof name === 'object' ? name.name || name.label || code : name
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
                const response = await axios.get('/api/v1/address/rovinces');
                const transformedData = transformData(response.data);
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
                const response = await axios.get(`/api/v1/address/districts?province=${selectedProvince}`);
                const transformedData = transformData(response.data);
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
                const response = await axios.get(`/api/v1/address/wards?district=${selectedDistrict}`);
                const transformedData = transformData(response.data);
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
                       }) => (
        <div className="relative">
            <select
                value={value}
                onChange={onChange}
                disabled={disabled || isLoading}
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
                {Array.isArray(options) && options.map(option => (
                    <option key={option.code} value={option.code}>
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

    return (
        <div className=" grid grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Province/City
                </label>
                <SelectBox
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
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
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    options={districts}
                    placeholder="Select district"
                    isLoading={isLoading.districts}
                    disabled={!selectedProvince}
                    error={error.districts}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ward
                </label>
                <SelectBox
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(e.target.value)}
                    options={wards}
                    placeholder="Select ward"
                    isLoading={isLoading.wards}
                    disabled={!selectedDistrict}
                    error={error.wards}
                />
            </div>
        </div>
    );
};

export default LocationSelector; 