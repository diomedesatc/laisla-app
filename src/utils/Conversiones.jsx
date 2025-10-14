import styled from "styled-components";

export function ConvertirCapitalize(input) {
  return (input.charAt(0).toUpperCase()+input.slice(1).toLowerCase());

}

export function ConvertirMinisculas(input) {
  return input.toLowerCase();
}


export function FormatearNumeroDinero(numero,currency, iso) {
  // First, ensure 'numero' is actually a number.
  // If it's not a number or is null/undefined, default to 0 for formatting,
  // or handle the error as appropriate for your application.
  if(currency == undefined){
    return;
  }

  const esiso = "es-" + iso;
  const numericValue = typeof numero === 'number' && !isNaN(numero) ? numero : 0;

  // Now, safely use toLocaleString on the confirmed number.
  const numeroConvertido = numericValue.toLocaleString(esiso, {
    style: "currency",
    currency: `${currency}`
  });

  return numeroConvertido;
}

export const urlToBase64 = async(imageUrl) =>{
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const reader = new FileReader();
  return new Promise((resolve, reject) =>{
    reader.onloadend = () =>{
      resolve(reader.result)
    }
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  })
}