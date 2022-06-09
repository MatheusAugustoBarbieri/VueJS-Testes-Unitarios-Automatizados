import Leiloeiro from "@/views/Leiloeiro";
import { mount } from "@vue/test-utils";

import { getLeilao, getLances } from "@/http";

import flushPromises from "flush-promises";

jest.mock("@/http");

const leilao = {
  produto: "Livro da casa do código",
  lanceInicial: 50,
  descricao: "Livro bem bacana sobre vue"
};

const lances = [
  {
    id: 1,
    valor: 1001,
    data: "2020-06-13T18:04:26.826Z",
    leilao_id: 1
  },
  {
    valor: 1005,
    data: "2020-06-13T18:04:26.826Z",
    leilao_id: 1,
    id: 2
  },
  {
    valor: 1099,
    data: "2020-06-13T18:19:44.871Z",
    leilao_id: 1,
    id: 3
  }
];

// Aula 13
describe("Leiloeiro inicia um leilao que nao possui lances", () => {
  it("avisa quando não existem lances", async () => {
    // controla o retorno das dependencias do componente
    // estou pedindo para que quando getLeilao for chamado ele retorna o leilao
    getLeilao.mockResolvedValueOnce(leilao);
    // e quando o getLances for chamado ele retorna um array vazio
    getLances.mockResolvedValueOnce([]);

    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    });

    // faz com que o teste aguarde ate que todas as promisses foram resolvidas
    await flushPromises();

    const alerta = wrapper.find(".alert-dark");
    // exists verifica se existe se sim ele retorna true se nao false
    expect(alerta.exists()).toBe(true);
  });
});

// Aula 14
describe("Um leiloeiro exibe os lances existentes", () => {
  it('Não mostra o aviso de "sem lances"', async () => {
    getLeilao.mockResolvedValueOnce(leilao);
    getLances.mockResolvedValueOnce(lances);
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    });

    await flushPromises();
    const alerta = wrapper.find(".alert-dark");
    expect(alerta.exists()).toBe(false);
  });
  it("Possui uma lista de lances", async () => {
    getLeilao.mockResolvedValueOnce(leilao);
    getLances.mockResolvedValueOnce(lances);
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    });

    await flushPromises();
    const lista = wrapper.find(".list-inline");
    expect(lista.exists()).toBe(true);
  });
});
//aula 15
describe("Um leiloeiro comunica os valores de menor e maior lance", () => {
  it("Mostra o maior lance daquele leilao", async () => {
    getLeilao.mockResolvedValueOnce(leilao);
    getLances.mockResolvedValueOnce(lances);
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    });

    await flushPromises();
    const maiorLance = wrapper.find(".maior-lance");
    expect(maiorLance.element.textContent).toContain("Maior lance: R$ 1099");
  });
  it("Mostra o menor lance daquele leilao", async () => {
    getLeilao.mockResolvedValueOnce(leilao);
    getLances.mockResolvedValueOnce(lances);
    const wrapper = mount(Leiloeiro, {
      propsData: {
        id: 1
      }
    });

    await flushPromises();
    const menorLance = wrapper.find(".menor-lance");
    expect(menorLance.element.textContent).toContain("Menor lance: R$ 1001");
  });
});
