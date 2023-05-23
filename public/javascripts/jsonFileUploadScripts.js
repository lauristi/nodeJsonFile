
//-------------------------------------------------------------------
// Função responsável por converter o arquivo em um objeto JSON
//-------------------------------------------------------------------
function converteArquivo(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      // 1-Inicia a leitura do arquivo como um Data URL
      reader.readAsDataURL(file);

      // 2-Quando a leitura do arquivo estiver concluída
      reader.onload = function() {
        const conteudoArquivo = reader.result.split(',')[1];

        const arquivoJSON = {
          nome: file.name,
          base64: conteudoArquivo
        };
  
        //3- Resolve a Promise com o objeto JSON
        resolve(arquivoJSON);
      };
  
      // Se ocorrer um erro durante a leitura do arquivo
      reader.onerror = function() {
        // Rejeita a Promise com uma mensagem de erro
        reject(new Error('Erro ao ler o arquivo.'));
      };
      
    });
  }
  
  //-------------------------------------------------------------------
  // Função responsável por enviar o arquivo para o endpoint usando o Axios
  //-------------------------------------------------------------------
  async function enviaArquivo(arquivoJSON) {
    try {
      // Envia a requisição POST para o endpoint '/jsonFile' com o JSON do arquivo
      const response = await axios.post('/api/jsonFileUpload', arquivoJSON);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  //-------------------------------------------------------------------
  // Função principal que é chamada quando o botão de envio é clicado
//-------------------------------------------------------------------
  function carregaArquivo() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    // Chama a função converteArquivo para converter o arquivo em um objeto JSON
    converteArquivo(file)
      .then(enviaArquivo) // Chama a função enviaArquivo para enviar o JSON para o endpoint
      .catch(error => {
        console.error(error);
      });
  }

//-------------------------------------------------------------------
//Loader
//-------------------------------------------------------------------  
function exibeAjaxLoader(mostrar) {
    const ajaxLoader = document.getElementById('ajaxLoader');
    ajaxLoader.style.display = mostrar ? 'block' : 'none';
  }