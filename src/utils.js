const calcEfectiveMultiplier = (anexo, faixa) =>
  [...anexo.entries()]
    .filter(([taxName]) => !["iss", "pis", "cofins"].includes(taxName))
    .reduce((acc, [, faixas]) => acc + faixas[faixa], 0) / 100;

const anexo3 = new Map([
  ["cpp", [43.4, 43.4, 43.4, 43.4]],
  ["iss", [33.5, 32.0, 32.5, 32.5]],
  ["csll", [3.5, 3.5, 3.5, 3.5]],
  ["irpj", [4.0, 4.0, 4.0, 4.0]],
  ["cofins", [12.82, 14.05, 13.64, 13.64]],
  ["pis", [2.78, 3.05, 2.96, 2.96]],
]);

const anexo5 = new Map([
  ["cpp", [28.85, 27.85, 23.85, 23.85]],
  ["iss", [14.0, 17.0, 19.0, 21.0]],
  ["csll", [15.0, 15.0, 15.0, 15.0]],
  ["irpj", [25.0, 23.0, 24.0, 21.0]],
  ["cofins", [14.1, 14.1, 14.92, 15.74]],
  ["pis", [3.05, 3.05, 3.23, 3.41]],
]);

const aliquotasIRPF = new Map([
  [0, [0, 0]],
  [1903.99, [7.5, 142.8]],
  [2826.65, [15, 354.8]],
  [3751.06, [22, 636.13]],
  [4664.66, [27.5, 869.36]],
]);

const aliquotasSimples = new Map([
  [0, [6, 0, calcEfectiveMultiplier(anexo3, 0)]],
  [180000 / 12, [11.2, 9360 / 12, calcEfectiveMultiplier(anexo3, 1)]],
  [360000.01 / 12, [13.5, 17640 / 12, calcEfectiveMultiplier(anexo3, 2)]],
  [720000.01 / 12, [16, 35640 / 12, calcEfectiveMultiplier(anexo3, 3)]],
  // [1800000.01 / 12, [21, 125640 / 12, calcEfectiveMultiplier(anexo3, 4)]],
  //[3600000.01 / 12, [33, 648000 / 12, calcEfectiveMultiplier(anexo3, 4)]],
]);

export function calcIRPF(salary, inss) {
  const value = salary - inss;

  let result = 0;
  for (const [min, [rate, discount]] of aliquotasIRPF.entries()) {
    if (value >= min) {
      result = (value * rate) / 100 - discount;
    } else {
      return result;
    }
  }
  return result;
}

export function calcSimples(value) {
  let result = 0;

  for (const [min, data] of aliquotasSimples.entries()) {
    const [rate, discount, actualMult] = data;

    if (value >= min) {
      result = value * ((rate / 100) * actualMult) - discount * actualMult;
    } else {
      return result;
    }
  }
  return result;
}

export function calcINSS(value, simples) {
  const rate = simples ? 11 : 31;
  return percent(Math.min(7087.22, value), rate);
}

export const percent = (value, percent) =>
  value ? (value / 100) * percent : 0;
export const n = (str) => (str ? Number(str) : str);
export const currency = (number) =>
  number
    ? n(number).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    : number;
