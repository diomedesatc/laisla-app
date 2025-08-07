import styled from "styled-components";

export function ConvertirCapitalize(input) {
  return (input.charAt(0).toUpperCase()+input.slice(1).toLowerCase());

}

export function ConvertirMinisculas(input) {
  return input.toLowerCase();
}


export function FormatearNumeroDinero(numero) {
  // First, ensure 'numero' is actually a number.
  // If it's not a number or is null/undefined, default to 0 for formatting,
  // or handle the error as appropriate for your application.
  const numericValue = typeof numero === 'number' && !isNaN(numero) ? numero : 0;

  // Now, safely use toLocaleString on the confirmed number.
  const numeroConvertido = numericValue.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP"
  });

  return numeroConvertido;
}