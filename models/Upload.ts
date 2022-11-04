import { DataTypes, Model, Optional } from "sequelize";
import connection from "../config/db";

interface UploadAttributes {
  id: number;
  originalName: string;
  type: string;
  fileName: string;
  size: number;
}

interface UploadCreationAttributes extends Optional<UploadAttributes, "id"> {}
// export interface UploadCreationAttributes extends Required<UploadAttributes> {}

class Upload
  extends Model<UploadAttributes, UploadCreationAttributes>
  implements UploadAttributes
{
  public id!: number;
  public originalName!: string;
  public type!: string;
  public fileName!: string;
  public size!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Upload.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    originalName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    type: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    fileName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "uploads",
    sequelize: connection,
  }
);

Upload.sync({});

export default Upload;
