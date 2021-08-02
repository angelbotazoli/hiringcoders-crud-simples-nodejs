// incluindo uma biblioteca
const http = require('http');
const url = require('url')
const queryString = require('query-string')
const fs = require('fs')

// definindo o ip e a porta, é a definição de endereço/url
const hostname = '127.0.0.1'; // localhost
const port = 3000;

// implementação da regra de negócio
const server = http.createServer((req, res) => {
    var resposta
    const urlparse = url.parse(req.url, true)

    // receber informacoes do usuario
    const params = queryString.parse(urlparse.search) //pega o valor da url apos o sinal de 
    // console.log(params)

    // criar um usuário e atualizar
    if (urlparse.pathname == '/criar-atualizar-usuario') {

        //salvar as informações
        fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) { //funcao de call back, após acao, chama funcao e validade se sucesso ou falha
            if (err) throw err // throw exibe o erro no terminal
            console.log('Saved!')
            resposta = 'Usuario criado/atualizado com sucesso'
            res.statusCode = 201; // avisando o navegador que esta tudo certo
            res.setHeader('Content-Type', 'text/plain');
            res.end(resposta)
        })

        // selecionar usuário
    } else if (urlparse.pathname == '/selecionar-usuario') {
        fs.readFile('users/' + params.id + '.txt', function (err, data) {
            resposta = data
            res.statusCode = 200; // avisando o navegador que esta tudo certo
            res.setHeader('Content-Type', 'application/json');
            res.end(resposta)
        })

        // remover um usuário
    } else if (urlparse.pathname == '/remover-usuario') {
        fs.unlink('users/' + params.id + '.txt', function (err) {
            console.log('File deleted!')

            resposta = err ? "usuario nao encontrado" : "usuario removido"

            res.statusCode = 200; // avisando o navegador que esta tudo certo
            res.setHeader('Content-Type', 'text/plain');
            res.end(resposta)
        })
    }
});

// tudo já esta configurado, então pode subir o servidor (execução)
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});