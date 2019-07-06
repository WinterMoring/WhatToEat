//const baseUrl = "/api";
const baseUrl = 'http://47.102.133.83:8080';
//const basemapurl = "/map";
//"https://bird.ioliu.cn/v1/?url=" 
const basemapurl = 'https://apis.map.qq.com';
const getlocationcity = basemapurl + "/ws/location/v1/ip ";
const addfavours = baseUrl + "/addfavours";
const login = baseUrl + "/login";
const regist = baseUrl + "/regist";
const delfavours = baseUrl + "/delfavours"
const getfavours = baseUrl + "/getfavours";
const mapsearch = basemapurl + "/ws/place/v1/search";
const locations = basemapurl + "/ws/district/v1/getchildren"
const locationid = basemapurl + "/ws/district/v1/search"
export default {
    addfavours,
    login,
    regist,
    getfavours,
    mapsearch,
    locations,
    locationid,
    delfavours,
    getlocationcity
}