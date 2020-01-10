class Service {
    constructor(ModelPrimary) {
        this.ModelPrimary = ModelPrimary;
    }

    async getById(id) {

    }

    async getAllModel() {

    }

    async deleteById(ID) {
        let result = await (this.ModelPrimary.destroy({ where: { id: ID } }));
        return result;
    }

    async update(model) {
        let result = await (this.ModelPrimary.update(model, {
            where: {
                deletedAt: {
                    [Op.ne]: null
                }
            }
        }));
    }
}