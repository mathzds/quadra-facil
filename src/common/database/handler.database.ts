import "reflect-metadata"
import { DataSource } from "typeorm"

import { UserEntity } from "src/core/user/entities/user.entity"
import { CourtEntity } from "src/core/court/entities/court.entity"
import { ReserveEntity } from "src/core/reserve/entities/reserve.entity"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [UserEntity, CourtEntity, ReserveEntity],
})

export const handleDatabase = async () => {
    AppDataSource.initialize().then(() => {
        console.log("Data Source has been initialized!")
    }).catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
}