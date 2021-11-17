from fastapi import FastAPI
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://127.0.0.1:8000",
    "*",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EconomyRequest(BaseModel):

    time_develop: float = Field(title="Время разработки")
    salary: float = Field(title="Оплата труда разработчика")
    add_coeff: float = Field(title='Коэффициент, учитывающий дополнительную заработную плату')
    overheads: float = Field(title='Процент накладных расходов организации')
    power_consumption: float = Field(title='Потребляемая мощность')
    energy_price: float = Field(title='Цена 1 кВт-ч электроэнергии')
    salary_staff: float = Field(title='Заработная плата в месяц персонала, обслуживающего компьютер')
    count_serviced_units: float = Field(title='Количество обслуживаемых им единиц оборудования')
    book_value: float = Field(title='Балансовая стоимость компьютера')
    time_coding: float = Field(title='Время кодирования')
    time_debugging: float = Field(title='Время отладки')
    profitability: float = Field(title='Норматив рентабельности')
    tax: float = Field(title='НДС')
    replication: float = Field(title='Тиражирование')
    additional_profit: float = Field(title='Дополнительная прибыль')


def salary_developers_calc(time_develop, salary):
    """Функция рассчета заработной платы разрабочтиков"""
    return time_develop * salary


def additional_salary_calc(add_coef, salary_developers):
    """Функция рассчета дополнительной заработной плата"""
    return add_coef * salary_developers


def social_contributions_calc(salary_developers, additional_salary):
    """Функция рассчета отчислений на социальные нужды"""
    return (salary_developers + additional_salary) * 0.356


def overhead_costs_calc(salary_developers, overheads):
    """Функция рассчета накладных расходов"""
    return (salary_developers * overheads) / 100


def cost_power_calc(power_consumption, working_fund, energy_price):
    """Функция рассчета стоимости потребляемой за год электроэнергии"""
    return power_consumption * working_fund * energy_price


def maintenance_costs_calc(salary_staff, count_serviced_units):
    """Функция рассчета расходов на обслуживание компьютера за год"""
    return salary_staff * 12 / count_serviced_units


def depreciation_charges_calc(book_value):
    """Функция рассчета амортизационных отчислений"""
    return 50 * book_value / 100


def repair_costs_calc(book_value):
    """Функция рассчета расходов на текущий ремонт"""
    return 0.05 * book_value


def operating_costs_calc(cost_power, maintenance_costs, depreciation_charges, repair_costs,
                         working_fund, time_coding, time_debugging):
    """Функция рассчета накладных расходы"""
    return ((cost_power + maintenance_costs + depreciation_charges + repair_costs) / working_fund) * (time_coding + time_debugging) * 8


def software_cost_calc(salary_developers, additional_salary, social_contributions, overhead_costs, operating_costs):
    """Функция расчета затрат на разработку программного обеспечения"""
    return salary_developers + additional_salary + social_contributions + overhead_costs + operating_costs


def cost_app_calc(software_cost, profitability):
    """Функция рассчета цены разработанного ПО"""
    return software_cost * (1 + profitability / 100)


def low_limit_calc(software_costs, profitability, replication, tax):
    """Функция рассчета нижнего предела цены"""
    return software_costs * (1 + profitability / 100) / replication * (1 + tax / 100)


def contract_price_calc(low_limit, additional_profit):
    """Функция рассчета договорной цены"""
    return low_limit * (1 + additional_profit / 100)


@app.post("/calculate/")
async def calculate(item: EconomyRequest):
    # рассчет Затрат на разработку программного обеспечения
    # заработная плата разрабочтиков
    salary_developers = salary_developers_calc(item.time_develop, item.salary)
    # дополнительная заработная плата
    additional_salary = additional_salary_calc(item.add_coeff, salary_developers)
    # отчисления на социальные нужды
    social_contributions = social_contributions_calc(salary_developers, additional_salary)
    # накладные расходы
    overhead_costs = overhead_costs_calc(salary_developers, item.overheads)
    # годовой полезный фонд
    working_fund = 8 * 288
    # стоимость потребляемой за год электроэнергии
    cost_power = cost_power_calc(item.power_consumption, working_fund, item.energy_price)
    # расходы на обслуживание компьютера за год
    maintenance_costs = maintenance_costs_calc(item.salary_staff, item.count_serviced_units)
    # амортизационные отчисления
    depreciation_charges = depreciation_charges_calc(item.book_value)
    # расходы на текущий ремонт
    repair_costs = repair_costs_calc(item.book_value)
    # накладные расходы
    operating_costs = operating_costs_calc(cost_power, maintenance_costs, depreciation_charges, repair_costs,
                                           working_fund, item.time_coding, item.time_debugging)
    # Затраты на разработку программного обеспечения
    software_cost = software_cost_calc(salary_developers, additional_salary, social_contributions,
                                       overhead_costs, operating_costs)
    # Цена разработанного ПО
    cost_app = cost_app_calc(software_cost, item.profitability)
    # Нижний предел цены
    low_limit = low_limit_calc(software_cost, item.profitability, item.replication, item.tax)
    # Договорная цена
    contract_price = contract_price_calc(low_limit, item.additional_profit)
    return {
        'software_cost': software_cost,
        'cost_app': cost_app,
        'low_limit': low_limit,
        'contract_price': contract_price,
        'salary_developers': salary_developers,
        'additional_salary': additional_salary,
        'social_contributions': social_contributions,
        'overhead_costs': overhead_costs,
        'operating_costs': operating_costs
    }
