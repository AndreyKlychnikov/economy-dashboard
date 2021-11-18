import pytest
from main import salary_developers_calc, additional_salary_calc, social_contributions_calc
from main import overhead_costs_calc, cost_power_calc, maintenance_costs_calc, depreciation_charges_calc
from main import repair_costs_calc, operating_costs_calc, software_cost_calc, cost_app_calc
from main import low_limit_calc, contract_price_calc


def test_salary_developers_calc():
    assert salary_developers_calc(150, 500) == 75000


def test_additional_salary_calc():
    tmp = 0.11 * 54678.8
    assert additional_salary_calc(0.11, 54678.8) == tmp


def test_social_contributions_calc():
    assert social_contributions_calc(75000, 84000) == 56603


def test_overhead_costs_calc():
    tmp = 54678.8 * 55 / 100
    assert overhead_costs_calc(54678.8, 55) == tmp


def test_cost_power_calc():
    tmp = 0.2 * 2304 * 2.85
    assert cost_power_calc(0.2, 2304, 2.85) == tmp


def test_maintenance_costs_calc():
    tmp = 11930 * 12 / 1
    assert maintenance_costs_calc(11930, 1) == tmp


def test_depreciation_charges_calc():
    tmp = 50 * 15000 / 100
    assert depreciation_charges_calc(15000) == tmp


def test_repair_costs_calc():
    tmp = 0.05 * 15000
    assert repair_costs_calc(15000) == tmp


def test_operating_costs_calc():
    tmp = (1313.28 + 143160 + 7500 + 750) / 2304 * 8 * (50 + 35)
    assert operating_costs_calc(1313.28, 143160, 7500, 750, 2304, 50, 35) == tmp


def test_software_cost_calc():
    tmp = 54678.8 + 6014.67 + 21606.87 + 30073.34 + 45077.20
    assert software_cost_calc(54678.8, 6014.67, 21606.87, 30073.34, 45077.20) == tmp


def test_cost_app_calc():
    tmp = 157450.88 * 1.2
    assert cost_app_calc(157450.88, 20) == tmp


def test_low_limit_calc():
    tmp = (157450.88 * 1.2) / 20 * (1 + 0.18)
    assert low_limit_calc(157450.88, 20, 20, 18) == tmp


def test_contract_price_calc():
    tmp = 11147.52 * 1.11
    assert contract_price_calc(11147.52, 11) == tmp
