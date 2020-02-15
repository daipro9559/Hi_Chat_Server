'use strict'
class Service {
    constructor(Model) {
        this.Model = Model;
    }

    async getById(id) {

    }



    async getAllModel() {

    }

    async deleteById(id) {
        let result = await (this.Model.destroy({ where: { id: id } }));
        return result;
    }

    async update(data) {
        let result = await (this.Model.update(data, {
            where: {
                deletedAt: {
                    [Op.ne]: null
                }
            }
        }));
    }
}

export default Service;