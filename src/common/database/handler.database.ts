import "reflect-metadata"
import { DataSource } from "typeorm"

import { UserEntity } from "src/core/user/entities/user.entity"
import { CourtEntity } from "src/core/court/entities/court.entity"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [UserEntity, CourtEntity],
})

export const handleDatabase = async () => {
    AppDataSource.initialize().then(() => {
        console.log("Data Source has been initialized!")
    }).catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
}