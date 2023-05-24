
//? Função responsável por converter o arquivo em um objeto JSON  
function converteArquivo(originalFile) {

    //0 - define uma promise 
    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        // 1-Inicia a leitura do arquivo como um Data URL
        reader.readAsDataURL(originalFile);

        // 2-Quando a leitura do arquivo estiver concluída
        reader.onload = function () {
            const conteudoArquivo = reader.result.split(',')[1];
            const arquivoJSON = {
                nome: originalFile.name,
                base64: conteudoArquivo
            };
        
            // 3- Resolve a Promise e envia o arquivoJSON
            resolve(arquivoJSON);
        };

        // Se ocorrer um erro durante a leitura do arquivo
        reader.onerror = function () {

            // Rejeita a Promise E retona uma mensagem de erro
            reject(new Error('Erro ao ler o arquivo.'));
        };
    });
}

//? Função responsável por enviar o arquivo para o endpoint usando o Axios
async function enviaArquivo(arquivoJSON) {
    try {

      exibeAjaxLoader(true); 
     
      //Recebe arquivoJSON envia para o endpoint da aplicacao
      const response = await axios.post('/api/jsonFileUpload', arquivoJSON);

      exibeAjaxLoader(false); 
      
      //# O endpoint vai processar o arquivo txt e retornar o conteudo em seguinda
      //# no Payload (response.data)

      //# Processa o retorno para permitir o download o arquivo
      const downloadMode = 'direct'
      downloadFile(response.data, `${arquivoJSON.nome}`,downloadMode);

    } catch (error) {
        console.error(`From: enviaArquivo | ${error}`);
    }
}

//? Função principal que é chamada quando o botão de envio é clicado
function carregaArquivo() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    // Chama a função converteArquivo para converter o arquivo em um objeto JSON
     converteArquivo(file)
            .then(enviaArquivo) // Chama  enviarArquivo arquivoJSON vem por callback
           .catch(error => {
                console.error(`From: carregaArquivo | ${error}`);
            });
}

//? ==========================================================================
//? Funções de apoio
//? ==========================================================================

//# Loader
function exibeAjaxLoader(mostrar) {
    const ajaxLoader = document.getElementById('ajaxLoader');
    ajaxLoader.style.display = mostrar ? 'block' : 'none';
}

//# Recria o arquivo através do conteudo retornado. Remontando o arquivo txt
function downloadFile(data, fileName,downloadMode) {

try {
    
  //01 Cria um objeto Blob com o conteúdo do arquivo
  const blob = new Blob([data], {type: 'text/plain'});

  //02 Cria uma URL temporária para o Blob
  const url = window.URL.createObjectURL(blob);

  //# Com a url do Blob crio em tempo de execução um elemento de ancora de
  //# hiperligação: <a> , vinculo ele ao Blob e simulo um click de mouse
  //# para download imediato

  const hiperlink = document.createElement('a');
        hiperlink.href = url;
        hiperlink.download = fileName;
  
  if(downloadMode == "direct"){
         hiperlink.click();  
        //Elimino a URL temporaria
        window.URL.revokeObjectURL(url);
    }else{
        hiperlink.textContent = `Clique para baixar o novo arquivo: ${arquivoJSON.nome}`;
        document.body.appendChild(hiperlink);
  }
} catch (error) {
    console.error(`From: downloadFile | ${error}`);
} 
  
}
