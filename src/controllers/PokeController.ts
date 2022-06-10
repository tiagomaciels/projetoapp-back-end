import axios from "axios";

export class PokeController {
  async getOne(req: any, res: any) {
    const urlPokeApi = process.env.POKEAPI;

    try {
      const { pokemon } = req.params;
      const pokeApi = await axios.get(`${urlPokeApi}pokemon/${pokemon}`);

      return res.status(200).json({
        id: pokeApi.data.id,  
        name: pokeApi.data.name,
        type: pokeApi.data.types[0].type.name,
        img: pokeApi.data.sprites.front_default,
      });
    } catch (error) {
        res.status(404).json(error)
    }
  }
}
