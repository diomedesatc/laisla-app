import pdfMake from "pdfmake/build/pdfmake";
import pdffonts from "pdfmake/build/vfs_fonts";
import printJS from "print-js";
//pdfMake.vfs = pdffonts.pdfMake.vfs;
pdfMake.vfs =pdffonts.vfs;

const createPdf = async(props, output ="print") => {
    return new Promise((resolve,reject) =>{
        try{
            const {
                pageSize = {
                    width: 226.77,
                    height: "auto",                   

                },
                pageMargins = [5.66,5.66,5.66,5.66],
                info={

                },
                styles = {

                },
                content
            } = props;

            const docDefinition = {
                pageSize, //Document size
                pageMargins, //Document's margins
                info, //Document's information 
                styles, //Styles of the document
                content,//PDF content
            }

            if(output==="b64"){
                const pdfMakeCreatePdf = pdfMake.createPdf(docDefinition);
                pdfMakeCreatePdf.getBase64((data)=>{
                    resolve({
                        success:true,
                        content: data,
                        message: "Archivo generado correctamente"
                    })
                })
                return;

            }else if(output === "print"){
                //Enviar a impresion directa
                const pdfMakeCreatePdf = pdfMake.createPdf(docDefinition);
                pdfMakeCreatePdf.getBase64((data) =>{
                    printJS({
                        printable:data,
                        type: "pdf",
                        base64: true
                    })

                    resolve({
                        success: true,
                        content:null,
                        message: "Documento enviado a impresion."
                    });
                });
                return;

            }

            reject({
                success: false,
                content: null,
                message: "Debes enviar tipo salida."
            });



        }catch(error){
            reject({
                success: false,
                content: null,
                message: error?.message ?? 'No se pudo generar el proceso.'
            })

        }
    })
    
}

export default createPdf;