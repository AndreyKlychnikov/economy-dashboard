import pytest

from backend.main import salary_developers_calc


def test_salary_developers_calc():
    assert salary_developers_calc(150, 500) == 75000
