import Avaliador from "@/views/Avaliador";
// simulador do routerlink "STUBS"
import { mount, RouterLinkStub } from "@vue/test-utils";

import { getLeiloes } from "@/http";

import flushPromises from "flush-promises";

jest.mock("@/http");

const leiloes = [
  {
    produto: "Livro da casa do código",
    lanceInicial: 50,
    descricao: "Livro bem bacana sobre teste"
  },
  {
    produto: "Livro da casa do código",
    lanceInicial: 50,
    descricao: "Livro bem bacana sobre teste"
  }
];

describe("Um avaliador que se conecta com a API", () => {
  it("mostra todos os leilões retornados pela API", async () => {
    getLeiloes.mockResolvedValueOnce(leiloes);
    // stubs sao os dubles, fala que o router-link é o RouterLinkStub do vue test utils que é um duble do router-link
    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    await flushPromises();
    // pega todos os elementos q tem a classe leilao
    const totalLeilõesExibidos = wrapper.findAll(".leilao");
    // garante q a quantia de elementos exibidos tem a mesma quantia do q passei com os dados mockados
    expect(totalLeilõesExibidos.length).toBe(leiloes.length);
  });

  it("não há leilões retornados pela API", async () => {
    getLeiloes.mockResolvedValueOnce([]);

    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    });
    await flushPromises();

    const totalLeilõesExibidos = wrapper.findAll(".leilao");

    expect(totalLeilõesExibidos.length).toBe(0);
  });
});
