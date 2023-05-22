//-----------------------------------------------
//
//-----------------------------------------------
function endpointError(error){

    var msg = `---- Error response ---- \n
            \n Data...: ${error.response.data} 
            \n Status.: ${error.response.status}
            \n Header.: ${error.response.headers}`

    return msg;
}

module.exports = {
    endpointError: endpointError
};