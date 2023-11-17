
export interface IdCheckRes {
    index: number,
    entities: any []
}


export class MkController {

    public static async checkIdExits(id: number, repo: any): Promise<IdCheckRes> {

        let entities = []
        let res: IdCheckRes = {index: -1, entities}

        try {
            let entity = await repo.findOneOrFail(id)
            res.entities.push(entity)
        } catch (e) {
           res.index = id
        }
        return res
    }

}