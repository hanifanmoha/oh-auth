const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    phone: {
      type: DataTypes.STRING,
      validate: {
        len: [1,20]
      },
      unique: true,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      validate: {
        len: [1,50]
      },
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        len: [1,50]
      },
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATE
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['male', 'female']],
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        len: [1,100],
        isEmail: true
      },
      unique: true,
      allowNull: false
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reset_token: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  return User;
};

module.exports = user;