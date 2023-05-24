function endpointError(error){

try {

    var msg = `---- Error response ---- \n
    \n Data...: ${error.response.data} 
    \n Status.: ${error.response.status}
    \n Header.: ${error.response.headers}`
} catch (error) {

    var msg = `---- Error response ---- \n
    \n Data...: ${error}`
}
    return msg;
}

module.exports = {
    endpointError: endpointError
};