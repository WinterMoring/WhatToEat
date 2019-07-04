const baseUrl = "/api";
const basemapurl = "/map";
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
    delfavours
}