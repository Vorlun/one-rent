import { Payments } from "../models/payment.model.js";
import { Contracts } from "../models/contract.model.js";
import { Users } from "../models/users.model.js";

// Yordamchi: id bo'yicha to'lovni topish va tegishli bog'lanmalarni qo'shish
const findById = async (id) => {
  return await Payments.findByPk(id, {
    include: [
      {
        model: Contracts,
        as: "contract",
        attributes: ["id", "start_time", "end_time", "total_price", "status"],
        include: [
          {
            model: Users,
            as: "customer",
            attributes: ["id", "full_name", "email", "phone"],
          },
        ],
      },
    ],
  });
};

// CREATE - yangi to'lov yaratish
export const create = async (req, res, next) => {
  try {
    const { contract_id, amount, method, paid_at } = req.body;

    if (!contract_id || !amount || !method) {
      return res.status(400).json({
        success: false,
        message: "contract_id, amount va method maydonlari majburiy.",
      });
    }

    // OPTIONAL: contract_id mavjudligini tekshirish
    const contract = await Contracts.findByPk(contract_id);
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: "Berilgan contract_id bo'yicha shartnoma topilmadi.",
      });
    }

    const payment = await Payments.create({
      contract_id,
      amount,
      method,
      paid_at: paid_at || new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// READ ALL - barcha to'lovlarni pagination bilan olish
export const getAll = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const { count, rows } = await Payments.findAndCountAll({
      order: [["paid_at", "DESC"]],
      limit,
      offset,
      include: [
        {
          model: Contracts,
          as: "contract",
          attributes: ["id", "start_time", "end_time", "total_price", "status"],
          include: [
            {
              model: Users,
              as: "customer",
              attributes: ["id", "full_name", "email", "phone"],
            },
          ],
        },
      ],
    });

    res.status(200).json({
      success: true,
      meta: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit,
      },
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

// READ ONE - ID bo'yicha bitta to'lovni olish
export const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const payment = await findById(id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE - ID bo'yicha to'lovni yangilash
export const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const payment = await findById(id);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    // OPTIONAL: contract_id yangilanayotgan bo‘lsa, uning haqiqatan mavjudligini tekshirish
    if (req.body.contract_id && req.body.contract_id !== payment.contract_id) {
      const contract = await Contracts.findByPk(req.body.contract_id);
      if (!contract) {
        return res.status(404).json({
          success: false,
          message: "Yangi contract_id bo'yicha shartnoma topilmadi.",
        });
      }
    }

    await payment.update(req.body);

    res.status(200).json({
      success: true,
      message: "Payment updated successfully",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE - ID bo'yicha to'lovni o'chirish
export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const payment = await findById(id);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    await payment.destroy();

    res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
