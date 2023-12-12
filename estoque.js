let estoque = {
    'joao': [
        { 'tipo': 'maca', 'quantidade': 1 },
    ],
    'maria': [
        { 'tipo': 'maca', 'quantidade': 2 },
    ],
};
export function getEstoque() {
    return structuredClone(estoque);
}

export function transacaoNoEstoque(de, para, tipo, quantidade) {

    if (!estoque[de] && de !== "pomar") {
        estoque[de] = [];
    }
    if (!estoque[para] && para !== "pomar") {
        estoque[para] = [];
    }
    if (quantidade < 0 || de === para) 
        return;

    if (para === "pomar") {
        let itemEncontrado = estoque[de].find(item => item.tipo === tipo);

        if (itemEncontrado) {
            if (itemEncontrado.quantidade >= quantidade) {
                itemEncontrado.quantidade = itemEncontrado.quantidade - quantidade;
            } else {
                itemEncontrado.quantidade = 0;
            }
        } else {
            return;
        }
        return;
    }
    if (de === "pomar") {
        const itemEncontrado = estoque[para].find(item => item.tipo === tipo);
        if (itemEncontrado) {
            itemEncontrado.quantidade += quantidade;
        } else {
            estoque[para].push({ tipo, quantidade });
        }
        return;
    }
    else {
        let itemOrigem = estoque[de].find(item => item.tipo === tipo);
        let itemDestino = estoque[para].find(item => item.tipo === tipo);

        if (!itemOrigem) 
            return;
        else if (itemOrigem.quantidade < quantidade) {
            if (itemDestino) {
                itemDestino.quantidade += itemOrigem.quantidade;
            } else {
                estoque[para].push({ tipo: tipo, quantidade: itemOrigem.quantidade });
            }
            itemOrigem.quantidade = 0;
        }

        else {
            if (itemDestino) {
                itemDestino.quantidade += quantidade;
            } else {
                estoque[para].push({ tipo, quantidade });
            }
            itemOrigem.quantidade = itemOrigem.quantidade - quantidade;
        }
    }
    return;
}
export function limpaEstoque() {
    estoque = {};
}

