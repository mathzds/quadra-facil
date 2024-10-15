import { EntityTarget, Repository } from "typeorm"
import { AppDataSource } from "../database/handler.database"

export default abstract class BaseRepository<T> {
    protected repository: Repository<T>

    constructor(private readonly entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(this.entity)
    }
}