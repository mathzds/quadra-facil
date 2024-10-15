import "reflect-metadata"
import { DataSource } from "typeorm"

import { UserEntity } from "src/core/user/entities/user.entity"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [UserEntity],
})

export const handleDatabase = async () => {
    AppDataSource.initialize().then(() => {
        console.log("Data Source has been initialized!")
    }).catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
}