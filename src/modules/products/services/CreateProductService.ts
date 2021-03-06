// TRATAMENTO DE VALIDAÇÕES E REGRAS DE NEGÓCIO

import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";

// vamos criar uma interface que é um tipo de produto
interface IRequest {
    name: string,
    price: number
    quantity: number
}

// vamos criar a classe
class CreateProductService {

    //vamos criar um método chamado execute para executar a inserção
    // recebe os dados do produto e retorna o produto inserido
    public async execute({name, price, quantity}: IRequest): Promise<Product> {
        // obter o repositório do produto
        let productRepository = getCustomRepository(ProductRepository)
        // vamos verificar se o produto já existe
        let productExists = await productRepository.findByName(name);
        if (productExists) {
            console.log(`Produto já existe!`)
            //
            // statusCode = 400 (não foi informado outro código)
            throw new AppError(`Pedimos desculpas, mas já existe um produto com este nome!`)
        }
        // cria o produto para inserção
        let newProduct = ProductRepository.create({
            name, price, quantity
        })
        // efetivamente insere
        await productRepository.save(newProduct);
        // retorno o novo produto
        return newProduct;
    }
}

export default CreateProductService