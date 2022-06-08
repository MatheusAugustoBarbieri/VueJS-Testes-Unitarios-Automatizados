import Leilao from "@/components/Leilao";

import { mount } from "@vue/test-utils";

// necessario pois ele recebe um objeto literal como props
const leilao = {
  produto: "Um livro da casa do código",
  lanceInicial: 49,
  descricao: "Um maravilhoso livro sobre VUE"
};

describe("Um leilão exibe os dados do produto", () => {
  // Aula 11
  it("exibe os dados do leilão no card", () => {
    const wrapper = mount(Leilao, {
      propsData: {
        leilao
      }
    });
    expect(wrapper).toBeTruthy;
  });

  // Aula 12
  it("exibe os dados do leilão no card", () => {
    const wrapper = mount(Leilao, {
      propsData: {
        leilao
      }
    });
    const header = wrapper.find(".card-header").element;
    const title = wrapper.find(".card-title").element;
    const text = wrapper.find(".card-text").element;
    // espera que header"textContent" <<<<< contenha
    expect(header.textContent).toContain(
      `Estamos leiloando um(a): ${leilao.produto}`
    );
    expect(title.textContent).toContain(
      `Lance inicial: R$ ${leilao.lanceInicial}`
    );
    expect(text.textContent).toContain(leilao.descricao);
  });
});
