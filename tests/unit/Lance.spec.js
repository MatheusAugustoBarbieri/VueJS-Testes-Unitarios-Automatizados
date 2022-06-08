import Lance from "@/components/Lance";
// utilizando para montar componentes
import { mount } from "@vue/test-utils";

// teste aula 1
test("não aceita lance com valor negativo", () => {
  expect(true).toBe(true);
});

// teste aula 2
test("não aceita lance com valor negativo", () => {
  // mount retorna o componente montado
  const wrapper = mount(Lance);
  expect(wrapper).toBeTruthy();
});

// teste aula 3
test("não aceita lance com valor negativo", () => {
  const wrapper = mount(Lance);
  // find procura o elemento dentro do componente(aceita seletores CSS)
  const input = wrapper.find("input");
  // passa um valor para o componente
  input.setValue(-100);
  expect(input).toBeTruthy();
});

// teste aula 4
test("não aceita lance com valor negativo", () => {
  const wrapper = mount(Lance);
  const input = wrapper.find("input");
  input.setValue(-100);
  // ativa o evento de submit do formulario do componente
  wrapper.trigger("submit");
  // captura todas emissões de eventos
  const lancesEmitidos = wrapper.emitted("novo-lance");
  expect(lancesEmitidos).toBeUndefined();
});

// teste aula 5
test("emite um lance quando o valor é maior do que zero", () => {
  const wrapper = mount(Lance);
  const input = wrapper.find("input");
  input.setValue(100);
  wrapper.trigger("submit");
  const lancesEmitidos = wrapper.emitted("novo-lance");
  // Verifica se existe um evento disparado dentro do metodo novo-lance
  expect(lancesEmitidos).toHaveLength(1);
});

// teste aula 6
test("emite o valor que foi adicionado no input", () => {
  const wrapper = mount(Lance);
  const input = wrapper.find("input");
  input.setValue(100);
  wrapper.trigger("submit");
  const lancesEmitidos = wrapper.emitted("novo-lance");
  //  retorno do emmmited é um array de arrays [[4]]
  //  retorna (um inteiro) o valor dentro desses arrays
  const lance = parseInt(lancesEmitidos[0][0]);
  // espera q o lance seja o mesmo que foi setado no input
  expect(lance).toBe(100);
});

describe("um lance com valor minimo", () => {
  // teste aula 7
  test("todos os lances devem possuir um valor maior do que o minimo informado", () => {
    // montando um componente e passando as propriedades
    // a propriedade define um valor minimo pro lance
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    });
    const input = wrapper.find("input");
    input.setValue(400);
    wrapper.trigger("submit");
    const lancesEmitidos = wrapper.emitted("novo-lance");

    expect(lancesEmitidos).toHaveLength(1);
  });

  // teste aula 8
  test("emite o valor esperado de um lance valido", () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    });
    const input = wrapper.find("input");
    input.setValue(400);
    wrapper.trigger("submit");
    const lancesEmitidos = wrapper.emitted("novo-lance");
    const lance = parseInt(lancesEmitidos[0][0]);
    expect(lance).toBe(400);
  });

  // teste aula 9
  test("Não são aceitos lances menores do que o minimo informado", async () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 250
      }
    });
    const input = wrapper.find("input");
    input.setValue(180);
    wrapper.trigger("submit");

    // A renderização do DOM é async então precisamos utilizar esse metodo para aguarda o DOM ser renderizado quando pegamos elementos html
    await wrapper.vm.$nextTick();

    // pega a classe alert dentro da tag p
    // element retorna o elemento html
    const msgErro = wrapper.find("p.alert").element;
    expect(msgErro).toBeTruthy();
    // toBeTruthy  = seja true
  });

  // teste aula 10
  test("Não são aceitos lances menores do que o minimo informado", async () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 250
      }
    });
    const input = wrapper.find("input");
    input.setValue(180);
    wrapper.trigger("submit");

    await wrapper.vm.$nextTick();

    // Pega o texto contido no elemento html
    const msgErro = wrapper.find("p.alert").element.textContent;

    const msgEsperada = "O valor mínimo para o lance é de R$ 250";
    // toContain = contenha
    expect(msgErro).toContain("valor");
    expect(msgErro).toContain(msgEsperada);
  });
});
