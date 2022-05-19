import { useState } from "react";
import { calcIRPF, calcSimples, calcINSS, currency, percent, n } from "./utils";
import "./App.css";

const ProLabore = ({ irpf, inss }) => (
  <table className="price-table">
    {irpf > 0 && (
      <tr>
        <td>IRPF</td>
        <td> {currency(irpf)}</td>
      </tr>
    )}
    <tr>
      <td>INSS</td>
      <td> {currency(inss)}</td>
    </tr>
  </table>
);

function App() {
  const [incoming, setIncoming] = useState(0);
  const [issRate, setIssRate] = useState(2);
  const [minSalary, setMinSalary] = useState(1212);
  const profit = percent(incoming, 32);

  const above20k = profit > 20000 ? profit - 20000 : 0;

  const CSLL = percent(profit, 9);
  const IRPJ = percent(profit, 15) + percent(above20k, 10);

  // const cofins = percent(incoming, 3);
  // const pis = percent(incoming, 0.65);
  // const iss = percent(incoming, issRate);
  const inssLP = calcINSS(minSalary);

  const totalLP = CSLL + IRPJ;

  const totalSN = calcSimples(incoming);
  const minSalarySN = percent(incoming, 28);
  const inssSN = calcINSS(minSalarySN, true);
  const irpfSN = calcIRPF(minSalarySN, inssSN);

  return (
    <div className="App">
      <header className="App-header">Lucro Presumido ou Simples</header>
      <div className="main">
        <section className="form-section">
          <div className="form-control">
            <label>Faturamento Mensal Bruto</label>
            <input
              type="number"
              onChange={(ev) => setIncoming(n(ev.target.value))}
              value={incoming}
            />
            <div className="input-legend"></div>
            {currency(incoming)}
          </div>
          {/* <div className="form-control">
            <label>Salário Mínimo</label>
            <input
              type="number"
              onChange={(ev) => setMinSalary(n(ev.target.value))}
              value={minSalary}
            />
            <div className="input-legend"></div>
            {currency(minSalary)}
          </div> */}
          {/* <div className="form-control">
            <label>ISS %</label>
            <input
              type="number"
              onChange={(ev) => setIssRate(n(ev.target.value))}
              value={issRate}
            />
            <div className="input-legend"></div>
            {currency(iss)}
          </div> */}
        </section>
        <section className="form-section">
          <h2>Lucro Presumido</h2>
          <table className="price-table">
            {/* <tr>
              <td>IRPJ</td>
              <td> {currency(IRPJ)}</td>
            </tr>
            <tr>
              <td>CSLL</td>
              <td> {currency(CSLL)}</td>
            </tr>
            <tr>
              <td>PIS</td>
              <td>ISENTO</td>
            </tr>
            <tr>
              <td>COFINS</td>
              <td>ISENTO</td>
            </tr>
            <tr>
              <td>ISS</td>
              <td>ISENTO</td>
            </tr> */}
            <tr>
              <td>
                <strong>Impostos Empresa</strong>
              </td>
              <td>
                <strong>{currency(totalLP)}</strong>
              </td>
            </tr>
          </table>

          <h3>Impostos Pró Labore ({currency(minSalary)})</h3>
          <ProLabore inss={inssLP} irpf={0} />

          <h3
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            TOTAL DE ENCARGOS
            <span>{currency(inssLP + totalLP)}</span>
          </h3>
        </section>

        <section className="form-section">
          <h2>Simples Nacional</h2>

          <table className="price-table">
            <tr>
              <td>
                <strong>Impostos Empresa</strong>
              </td>
              <td>
                <strong>{currency(totalSN)}</strong>
              </td>
            </tr>
          </table>

          <h3>Impostos Pró Labore ({currency(minSalarySN)})</h3>
          <ProLabore inss={inssSN} irpf={irpfSN} />

          <h3
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            TOTAL DE ENCARGOS
            <span>{currency(inssSN + totalSN + irpfSN)}</span>
          </h3>
        </section>
      </div>
    </div>
  );
}

export default App;
