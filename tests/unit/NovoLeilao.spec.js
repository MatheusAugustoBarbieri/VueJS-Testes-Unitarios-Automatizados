import NovoLeilao from "@/views/NovoLeilao";
import { mount } from "@vue/test-utils";
import { createLeilao } from "@/http";

jest.mock("@/http");
// simulando router pq n queremos testar o router
const $router = {
  // diz q o push é uma função
  push: jest.fn()
};

describe("Um novo leilao deve ser criado", () => {
  it("dado o formulario preenchido, um leilao deve ser criado", async () => {
    createLeilao.mockResolvedValueOnce();
    // passa o mock(simulador) pro NovoLeilao
    const wrapper = mount(NovoLeilao, {
      mocks: {
        $router
      }
    });
    wrapper.find(".produto").setValue("Um livro da casa do código");
    wrapper.find(".descricao").setValue("Conteudo de primeira");
    wrapper.find(".valor").setValue(50);
    wrapper.find("form").trigger("submit");
    // espera q ele foi chamado
    expect(createLeilao).toHaveBeenCalled();
  });
});
