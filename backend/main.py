from fastapi import FastAPI
from pydantic import BaseModel, Field


class EconomyRequest(BaseModel):

    time_develop: int = Field(title="Время разработки")
    salary: int = Field(title="Оплата труда разработчика")
    add_coeff: float = Field(title='Коэффициент, учитывающий дополнительную заработную плату')
    overheads: float = Field(title='Процент накладных расходов организации')
    power_consumption: float = Field(title='Потребляемая мощность')
    energy_price: float = Field(title='Цена 1 кВт-ч электроэнергии')
    salary_staff: int = Field(title='Заработная плата в месяц персонала, обслуживающего компьютер')
    count_serviced_units: int = Field(title='Количество обслуживаемых им единиц оборудования')
    book_value: int = Field(title='Количество обслуживаемых им единиц оборудования')
    time_coding: int = Field(title='Время кодирования')
    time_debugging: int = Field(title='Времям отладки')
    profitability: float = Field(title='Норматив рентабельности')
    tax: float = Field(title='НДС')
    replication: int = Field(title='Тиражирование')
    additional_profit: float = Field(title='Дополнительная прибыль')


app = FastAPI()


@app.post("/calculate/")
async def calculate(item: EconomyRequest):
    # рассчет Затрат на разработку программного обеспечения
    salary_developers = item.time_develop * item.salary
    additional_salary = item.add_coeff * salary_developers
    social_contributions = (salary_developers + additional_salary) * 0.356
    overhead_costs = (salary_developers * item.overheads) / 100
    working_fund = 8 * 288
    cost_power = item.power_consumption * working_fund * item.energy_price
    maintenance_costs = item.salary_staff * 12 / item.count_serviced_units
    depreciation_charges = 50 * item.book_value / 100
    repair_costs = 0.05 * item.book_value
    operating_costs = (cost_power + maintenance_costs + depreciation_charges + repair_costs) / working_fund
    software_cost = salary_developers + additional_salary + social_contributions + overhead_costs + operating_costs
    # Цена разработанного ПО
    cost_app = software_cost * (1 + item.profitability / 100)
    # Нижний предел цены
    low_limit = operating_costs * (1 + item.profitability / 100) / item.replication * (1 + item.tax / 100)
    # Договорная цена
    contract_price = low_limit * (1 + item.additional_profit / 100)
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
