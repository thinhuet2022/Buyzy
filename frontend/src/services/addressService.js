import axios from 'axios';
const addressService = {
    async getProvinces() {
        return await axios.get('https://partner.viettelpost.vn/v2/categories/listProvince');
    },

    async getDistricts(provinceId) {
        return await axios.get(`https://partner.viettelpost.vn/v2/categories/listDistrict?provinceId=${provinceId}`);
    },

    async getWards(districtId) {
        return await axios.get(`https://partner.viettelpost.vn/v2/categories/listWards?districtId=${districtId}`);
    },
};

export default addressService;