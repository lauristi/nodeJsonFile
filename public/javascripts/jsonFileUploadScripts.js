
//? Função responsável por converter o arquivo em um objeto JSON
function converteArquivo(originalFile) {
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

            // 3- Resolve a Promise com o objeto JSON
            resolve(arquivoJSON);
        };

        // Se ocorrer um erro durante a leitura do arquivo
        reader.onerror = function () {
            // Rejeita a Promise com uma mensagem de erro
            reject(new Error('Erro ao ler o arquivo.'));
        };

    });
}

//? Função responsável por enviar o arquivo para o endpoint usando o Axios
async function enviaArquivo(arquivoJSON) {
    try {

      exibeAjaxLoader(true); 
     // Envia a requisição POST 
     //para o endpoint '/jsonFile' com o JSON do arquivo
      const response = await axios.post('/api/jsonFileUpload', arquivoJSON);
      exibeAjaxLoader(false); 
      
      //const mode = 'direct'
      const mode = 'indirect'

      if (mode == 'direct'){
          //#Download direto
          downloadFile(response.data, `${arquivoJSON.nome}`);

        }else{
          //#Link dinamico
          const downloadLink = document.createElement('a');
          downloadLink.href = createDownloadURL(response.data, `${arquivoJSON.nome}`);
          downloadLink.textContent = `Clique para baixar o novo arquivo: ${arquivoJSON.nome}`;
          document.body.appendChild(downloadLink);
      }

    } catch (error) {
        console.error(error);
    }
}

//? Função principal que é chamada quando o botão de envio é clicado
function carregaArquivo() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    // Chama a função converteArquivo para converter o arquivo em um objeto JSON
     converteArquivo(file)
            .then(enviaArquivo) // Chama  enviarArquivo arquivoJSON vem por callback
           .catch(error => {console.error(error);
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

//# Recria o arquivo atravês do conteudo retornado. Remontando o arquivo txt
function downloadFile(data, fileName) {

  //01 Cria um objeto Blob com o conteúdo do arquivo
  const blob = new Blob([data], {type: 'text/plain'});

  //02 Cria uma URL temporária para o Blob
  const url = window.URL.createObjectURL(blob);

  //03 Cria um elemento <a> para simular um clique em um link de download
  const a = document.createElement('a');

  //04 Define a URL do arquivo como o valor do atributo href do elemento <a>
  a.href = url;

  //05 Define o nome do arquivo a ser baixado como o valor do atributo download do elemento <a>
  a.download = fileName;

  //06 Simula um clique no elemento <a> para iniciar o download do arquivo
  a.click();

  //07 Libera a URL temporária do Blob para liberar recursos
  window.URL.revokeObjectURL(url);
}

//# Cria uma URL de Download dinamica
function createDownloadURL(data, fileName) {
  // Cria um objeto Blob com o conteúdo do arquivo
  const blob = new Blob([data], {type: 'text/plain'});

  // Cria uma URL temporária para o Blob
  const url = window.URL.createObjectURL(blob);

  // Retorna a URL temporária para ser usada posteriormente
  return url;
}
