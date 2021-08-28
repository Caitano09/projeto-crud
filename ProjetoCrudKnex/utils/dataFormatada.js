const dataFormadata = Data => {
    Data.setDate(Data.getDate());

    const dataSistema = Data.toDateString();//Exemplo de sáida: Tue Jan 09 1998
    const dataTracinho = Data.toLocaleDateString(); //Exemplo de sáida: 1998-1-9

    if ((Data.getMonth() + 1) < 10 && Data.getDate() < 10) {

        dataCorrigida = dataTracinho.replace(new RegExp("-", "g"), "-0")

    } else if ((Data.getMonth() + 1) < 10) {

        dataCorrigida = dataTracinho.replace('-', '-0')

    } else if (Data.getDate() < 10) {

        dataCorrigida = dataTracinho.replace('-', '/')
        dataCorrigida = dataCorrigida.replace('-', '-0')
        dataCorrigida = dataCorrigida.replace('/', '-')
    }else{

        dataCorrigida = dataTracinho
    }//
    
    return dataCorrigida//Exemplo de sáida: 1998-01-09
}

module.exports = { dataFormadata }