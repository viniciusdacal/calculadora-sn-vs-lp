export function calcIRPF(value) {
  const aliquotas = new Map();
  aliquotas.set(0, [0, 0]);
  aliquotas.set(1903.99, [7.5, 142.8]);
  aliquotas.set(2826.65, [15, 354.8]);
  aliquotas.set(3751.06, [22, 636.13]);
  aliquotas.set(4664.66, [27.5, 869.36]);

  let result = 0;
  for (const [min, [rate, discount]] of aliquotas.entries()) {
    if (value >= min) {
      result = (value * rate) / 100 - discount;
    } else {
      return result;
    }
  }
  return result;
}

export function calcSimples(value) {
  const aliquotas = new Map();

  aliquotas.set(0, [0, 0]);
  aliquotas.set(180000 / 12, [11.2, 9360 / 12]);
  aliquotas.set(360000.01 / 12, [13.5, 17640 / 12]);
  aliquotas.set(720000.01 / 12, [16, 35640 / 12]);
  aliquotas.set(1800000.01 / 12, [21, 125640 / 12]);
  aliquotas.set(3600000.01 / 12, [33, 648000 / 12]);

  let result = 0;
  for (const [min, [rate, discount]] of aliquotas.entries()) {
    if (value >= min) {
      result = (value * rate) / 100 - discount;
    } else {
      return result;
    }
  }
  return result;
}

export function calcINSS(value, simples) {
  const rate = simples ? 11 : 31;
  return Math.min(707.69, (value * rate) / 100);
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
