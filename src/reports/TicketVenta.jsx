import {urlToBase64} from "../utils/Conversiones";
import createPdf from "../utils/CreatePdf";

const TicketVenta = async(output, data) =>{
    const logoempresa = await urlToBase64(data.logo);
    const productTableBody = [
        [
            {text: "Codigo - Descripcion" , style: "tProductsHeader" , colSpan: 4}
            ,{},{},{}
        ],
        [
            {text: "Cant." , style: "tProductsHeader"},
            {text: "Um." , style: "tProductsHeader", alignment: "center"},
            {text: "Precio." , style: "tProductsHeader", alignment: "right"},
            {text: "Total." , style: "tProductsHeader", alignment: "right"}
        ],

        ...data.productos.flatMap(producto => [
            [
                {
                    text: `"codigo" - ${producto._descripcion}`,
                    style: "tProductsBody",
                    colSpan: 4
                },{},{},{}
            ],
            [
                {text: producto._cantidad, style: "tProductsBody", alignment: "center"},
                {text: "Unidad", style: "tProductsBody", alignment: "center"},
                {text: producto._precio_venta, style: "tProductsBody", alignment: "right"},
                {text: producto._total, style: "tProductsBody", alignment: "right"},
            ]
        ])
    ]
    //DATA DE LA EMPRESA
    const content = [
        {
        image: logoempresa,
        fit:[141.73,56.692],
        alignment: "center"
        },
        {
            text: data.nombre,
            style: "header",
            margin: [0,10, 0,0]

        },
        {
            text: data.direccion,
            style: "header"
        },
        {
            text: "RUN: ",
            style: "header"
        },
        {
            text: "Boleta Electronica",
            style: "header",
            margin: [0, 10, 0, 2.25]
        },
        {
            text: "F0001-0000001",
            style: "header",
            margin: [0, 2.25, 0, 0]
        },

        //Datos de la cabecera
        {
            table: {
                widths:["25%","35%", "15%", "25%"],
                body: [
                    [
                        {
                            text: "Fecha",
                            style: "tHeaderLabel"
                        },
                        {
                            text: `${data.dia}/${data.mes}/${data.ano}`,
                            //text: "12/08/2025",
                            style: "tHeaderLabel"
                        },
                        {
                            text: "Hora:",
                            style: "tHeaderLabel"
                        },
                        {
                            text: `${data.hora}:${data.minutos}:${data.segundos}`,
                            //text: "15:23:35",
                            style: "tHeaderLabel"
                        },
                    ],
                    [
                        {
                            text: "Cajero:",
                            style: "tHeaderLabel"
                        },
                        {
                            text: "Nombre del cajero",
                            style: "tHeaderValue",
                            colSpan: 3,
                        },{},{}
                    ],

                    //Datos del Cliente
                    [
                        {
                            text: "Cliente: ",
                            style: "tTotals",
                            alignment: "left",
                            colSpan: 4,
                            margin: [0,6,0,0]

                        },{},{},{}
                    ],
                    [
                        {
                            text: "Nombre: ",
                            style: "tClientLabel",
                        },
                        {
                            text: `${data.nombre_cliente}`,
                            style: "tClientValue",
                            colSpan: 3,
                        },{},{}
                    ],
                    [
                        {
                            text: "RUN:", style: "tClientLabel"
                        },
                        {
                            text: `${data.rut_cliente}`, style: "tClientValue", colSpan: 3
                        },{},{}
                    ],
                    [
                        {
                            text: "Direccion:", style: "tClientLabel"
                        },
                        {
                            text: `${data.direccion_cliente}`, style: "tClientValue", colSpan: 3
                        },{},{}
                    ]
                ],
            },
            layout: "noBorders"

        },
        //Tabla de productos
        {
            margin: [0,10,0,0],
            table: {
                widths: ["20%", "20%", "30%", "30%"],
                headerRows: 2,
                body: productTableBody
            },
            layout: "noBorders"
        },
        //Totales
        {
            margin: [0,10,0,0],
            layout: "noBorders",
            table: {
                widths: ["25%","35%", "15%", "25%"],
                body: [
                    [
                        {text: "Subtotal: CL/", style: "tTotals", colSpan: 2},
                        {},
                        {text: `${data.total}`, style: "tTotals", colSpan: 2},
                        {}
                    ],
                    [
                        {text: "Total: CL/", style: "tTotals", colSpan: 2},
                        {},
                        {text: `${data.total}`, style: "tTotals", colSpan: 2},
                        {}
                    ],
                    //Formas de pago
                    [
                        {text: "Forma de pago:", style: "tTotals", alignment: "left", colSpan: 4, margin:[0,4,0,0]},{},{},{}
                    ],
                    [
                        {text: `${data.tipodecobro}`, style: "tProductsBody", colSpan: 4},{},{},{}
                    ]
                ]
            }
        },
        //Nota de pie
        {
            text: "Gracias por apoyar este emprendimiento. Que disfrutes nuestro trabajo y que tengas un excelente dia.",
            style: "text",
            alignment: "justify",
            margin: [0,5]

        },
        //Codigo QR
        {
            stack: [
                {
                    qr:"https://www.instagram.com/laisla_drinks/",
                    fit: 115,
                    alignment: "center",
                    eccLevelL: "Q",
                    margin: [0,10,0,3]

                },
                {
                    text: "Siguenos en instagram!",
                    style: "text"
                },
                {
                    text: "https://www.instagram.com/laisla_drinks/",
                    link: "https://www.instagram.com/laisla_drinks/",
                    style: "link", 
                }
            ]

        }
    ];
    
    const styles = {
        header: {
            fontSize: 9,
            bold: true,
            alignment: 'center',
        },
        tHeaderLabel: {
            fontSize: 8,
            alignment: 'right',            
        },
        tHeaderValue: {
            fontSize: 8,
            bold: true,

        },
        tProductsHeader: {
            fontSize: 8.5,
            bold: true,
        },
        tProductsBody: {
            fontSize: 8,
        },
        tTotals: {
            fontSize: 9,
            bold: true,
            alignment: 'right'
        },
        tClientLabel: {
            fontSize: 8,
            alignment: 'right'
        },
        tClientValue: {
            fontSize: 8,
            bold: true,
        },
        text: {
            fontSize: 8,
            alignment: 'center'
        },
        link: {
            fontSize: 8,
            bold: true,
            margin: [0,0,0,4],
            alignment: 'center',
        }
    }
    const response = await createPdf({content, styles}, output)
    return response;

    
}

export default TicketVenta;