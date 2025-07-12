---
title: "Variable Manager - Data Analysis Examples"
tags: ["examples", "variables", "data-analysis", "calculations", "finance"]
created: 2024-01-15
modified: 2024-01-15
---

# Variable Manager - Data Analysis Examples

This note demonstrates how to use variables for mathematical calculations, financial analysis, and data processing scripts. Perfect for creating reusable analysis templates.

## 📈 Financial Calculations

### Investment Return Analysis
```python
# Investment Analysis
initial_investment = $InitialInvestment
annual_return_rate = $AnnualReturnRate / 100  # Convert percentage to decimal
investment_period_years = $InvestmentPeriodYears
monthly_contribution = $MonthlyContribution

# Compound interest calculation
total_months = investment_period_years * 12
monthly_rate = annual_return_rate / 12

# Future value with monthly contributions
fv = initial_investment * (1 + annual_return_rate) ** investment_period_years

# Future value of monthly contributions (annuity)
if monthly_rate > 0:
    fv_contributions = monthly_contribution * (((1 + monthly_rate) ** total_months - 1) / monthly_rate)
else:
    fv_contributions = monthly_contribution * total_months

total_future_value = fv + fv_contributions
total_invested = initial_investment + (monthly_contribution * total_months)
total_gain = total_future_value - total_invested

print(f"Investment Summary for $InvestmentName:")
print(f"Initial Investment: ${initial_investment:,.2f}")
print(f"Monthly Contribution: ${monthly_contribution:,.2f}")
print(f"Investment Period: {investment_period_years} years")
print(f"Annual Return Rate: {annual_return_rate * 100:.2f}%")
print(f"Total Invested: ${total_invested:,.2f}")
print(f"Future Value: ${total_future_value:,.2f}")
print(f"Total Gain: ${total_gain:,.2f}")
print(f"ROI: {(total_gain / total_invested) * 100:.2f}%")
```

### Loan Calculator
```python
# Loan Calculation
loan_amount = $LoanAmount
annual_interest_rate = $AnnualInterestRate / 100
loan_term_years = $LoanTermYears

# Monthly payment calculation
monthly_rate = annual_interest_rate / 12
total_months = loan_term_years * 12

if monthly_rate > 0:
    monthly_payment = loan_amount * (monthly_rate * (1 + monthly_rate) ** total_months) / ((1 + monthly_rate) ** total_months - 1)
else:
    monthly_payment = loan_amount / total_months

total_paid = monthly_payment * total_months
total_interest = total_paid - loan_amount

print(f"Loan Analysis for $LoanPurpose:")
print(f"Loan Amount: ${loan_amount:,.2f}")
print(f"Interest Rate: {annual_interest_rate * 100:.2f}% APR")
print(f"Loan Term: {loan_term_years} years")
print(f"Monthly Payment: ${monthly_payment:,.2f}")
print(f"Total Paid: ${total_paid:,.2f}")
print(f"Total Interest: ${total_interest:,.2f}")
print(f"Interest as % of Principal: {(total_interest / loan_amount) * 100:.2f}%")
```

## 📊 Statistical Analysis

### Data Summary Statistics
```python
import numpy as np
import pandas as pd
from scipy import stats

# Data Analysis Configuration
dataset_name = "$DatasetName"
target_column = "$TargetColumn"
confidence_level = $ConfidenceLevel / 100
sample_size = $SampleSize

# Load and analyze data
# data = pd.read_csv('$DataFilePath')
# sample_data = data[target_column].dropna()

# For demonstration, using simulated data
np.random.seed($RandomSeed)
sample_data = np.random.normal($PopulationMean, $PopulationStdDev, sample_size)

# Calculate statistics
mean = np.mean(sample_data)
median = np.median(sample_data)
std_dev = np.std(sample_data, ddof=1)
variance = np.var(sample_data, ddof=1)
min_val = np.min(sample_data)
max_val = np.max(sample_data)
q1 = np.percentile(sample_data, 25)
q3 = np.percentile(sample_data, 75)
iqr = q3 - q1

# Confidence interval
margin_error = stats.t.ppf((1 + confidence_level) / 2, sample_size - 1) * (std_dev / np.sqrt(sample_size))
ci_lower = mean - margin_error
ci_upper = mean + margin_error

print(f"Statistical Analysis: {dataset_name}")
print(f"Column: {target_column}")
print(f"Sample Size: {sample_size}")
print(f"")
print(f"Descriptive Statistics:")
print(f"Mean: {mean:.4f}")
print(f"Median: {median:.4f}")
print(f"Standard Deviation: {std_dev:.4f}")
print(f"Variance: {variance:.4f}")
print(f"Min: {min_val:.4f}")
print(f"Max: {max_val:.4f}")
print(f"Q1 (25th percentile): {q1:.4f}")
print(f"Q3 (75th percentile): {q3:.4f}")
print(f"IQR: {iqr:.4f}")
print(f"")
print(f"{confidence_level * 100}% Confidence Interval:")
print(f"Lower Bound: {ci_lower:.4f}")
print(f"Upper Bound: {ci_upper:.4f}")
```

### Hypothesis Testing
```python
from scipy import stats
import numpy as np

# Hypothesis Test Configuration
test_name = "$TestName"
null_hypothesis = "$NullHypothesis"
alternative_hypothesis = "$AlternativeHypothesis"
significance_level = $SignificanceLevel
hypothesized_mean = $HypothesizedMean

# Sample data (replace with your actual data)
np.random.seed($RandomSeed)
sample_data = np.random.normal($SampleMean, $SampleStdDev, $SampleSize)

# Calculate test statistics
sample_mean = np.mean(sample_data)
sample_std = np.std(sample_data, ddof=1)
n = len(sample_data)

# Perform one-sample t-test
t_statistic, p_value = stats.ttest_1samp(sample_data, hypothesized_mean)

# Critical value
degrees_freedom = n - 1
critical_value = stats.t.ppf(1 - significance_level/2, degrees_freedom)

# Effect size (Cohen's d)
cohens_d = (sample_mean - hypothesized_mean) / sample_std

print(f"Hypothesis Test: {test_name}")
print(f"")
print(f"Hypotheses:")
print(f"H₀: {null_hypothesis}")
print(f"H₁: {alternative_hypothesis}")
print(f"")
print(f"Test Parameters:")
print(f"Significance Level (α): {significance_level}")
print(f"Sample Size: {n}")
print(f"Hypothesized Mean: {hypothesized_mean}")
print(f"")
print(f"Sample Statistics:")
print(f"Sample Mean: {sample_mean:.4f}")
print(f"Sample Std Dev: {sample_std:.4f}")
print(f"")
print(f"Test Results:")
print(f"t-statistic: {t_statistic:.4f}")
print(f"p-value: {p_value:.6f}")
print(f"Critical value (±): {critical_value:.4f}")
print(f"Cohen's d: {cohens_d:.4f}")
print(f"")
print(f"Decision:")
if p_value < significance_level:
    print(f"Reject H₀ (p < α)")
    print(f"There is significant evidence to support {alternative_hypothesis}")
else:
    print(f"Fail to reject H₀ (p ≥ α)")
    print(f"Insufficient evidence to support {alternative_hypothesis}")
```

## 🧮 Business Metrics

### Customer Analytics
```python
# Customer Metrics Analysis
business_name = "$BusinessName"
analysis_period = "$AnalysisPeriod"

# Customer Acquisition Cost (CAC)
marketing_spend = $MarketingSpend
sales_spend = $SalesSpend
new_customers = $NewCustomers
cac = (marketing_spend + sales_spend) / new_customers if new_customers > 0 else 0

# Customer Lifetime Value (CLV)
average_purchase_value = $AveragePurchaseValue
purchase_frequency = $PurchaseFrequency  # purchases per period
customer_lifespan = $CustomerLifespan  # periods
clv = average_purchase_value * purchase_frequency * customer_lifespan

# Churn Analysis
customers_start = $CustomersStart
customers_end = $CustomersEnd
churned_customers = $ChurnedCustomers
churn_rate = churned_customers / customers_start if customers_start > 0 else 0
retention_rate = 1 - churn_rate

# Revenue Metrics
total_revenue = $TotalRevenue
recurring_revenue = $RecurringRevenue
revenue_per_customer = total_revenue / customers_end if customers_end > 0 else 0

# Cohort Analysis
cohort_month_1_retention = $CohortMonth1Retention / 100
cohort_month_3_retention = $CohortMonth3Retention / 100
cohort_month_6_retention = $CohortMonth6Retention / 100

print(f"Customer Analytics Dashboard - {business_name}")
print(f"Period: {analysis_period}")
print(f"" + "="*50)
print(f"")
print(f"Acquisition Metrics:")
print(f"Customer Acquisition Cost (CAC): ${cac:.2f}")
print(f"New Customers Acquired: {new_customers:,}")
print(f"Marketing Spend: ${marketing_spend:,.2f}")
print(f"Sales Spend: ${sales_spend:,.2f}")
print(f"")
print(f"Retention Metrics:")
print(f"Churn Rate: {churn_rate:.2%}")
print(f"Retention Rate: {retention_rate:.2%}")
print(f"Customers at Start: {customers_start:,}")
print(f"Customers at End: {customers_end:,}")
print(f"")
print(f"Revenue Metrics:")
print(f"Customer Lifetime Value (CLV): ${clv:.2f}")
print(f"CLV/CAC Ratio: {clv/cac:.2f}" if cac > 0 else "CLV/CAC Ratio: N/A")
print(f"Revenue per Customer: ${revenue_per_customer:.2f}")
print(f"Total Revenue: ${total_revenue:,.2f}")
print(f"Recurring Revenue: ${recurring_revenue:,.2f}")
print(f"")
print(f"Cohort Retention:")
print(f"Month 1: {cohort_month_1_retention:.1%}")
print(f"Month 3: {cohort_month_3_retention:.1%}")
print(f"Month 6: {cohort_month_6_retention:.1%}")
```

## 🔬 Scientific Calculations

### Physics Formulas
```python
import math

# Physics Calculations
experiment_name = "$ExperimentName"
researcher = "$Researcher"
date = "$ExperimentDate"

print(f"Physics Calculations: {experiment_name}")
print(f"Researcher: {researcher}")
print(f"Date: {date}")
print(f"")

# Kinematics
initial_velocity = $InitialVelocity  # m/s
acceleration = $Acceleration  # m/s²
time = $Time  # seconds
gravity = 9.81  # m/s²

final_velocity = initial_velocity + acceleration * time
displacement = initial_velocity * time + 0.5 * acceleration * time**2
average_velocity = (initial_velocity + final_velocity) / 2

print(f"Kinematics Analysis:")
print(f"Initial Velocity: {initial_velocity} m/s")
print(f"Acceleration: {acceleration} m/s²")
print(f"Time: {time} s")
print(f"Final Velocity: {final_velocity:.2f} m/s")
print(f"Displacement: {displacement:.2f} m")
print(f"Average Velocity: {average_velocity:.2f} m/s")
print(f"")

# Energy Calculations
mass = $Mass  # kg
height = $Height  # m
velocity = $Velocity  # m/s

kinetic_energy = 0.5 * mass * velocity**2
potential_energy = mass * gravity * height
total_energy = kinetic_energy + potential_energy

print(f"Energy Analysis:")
print(f"Mass: {mass} kg")
print(f"Height: {height} m")
print(f"Velocity: {velocity} m/s")
print(f"Kinetic Energy: {kinetic_energy:.2f} J")
print(f"Potential Energy: {potential_energy:.2f} J")
print(f"Total Mechanical Energy: {total_energy:.2f} J")
print(f"")

# Wave Properties
frequency = $Frequency  # Hz
wavelength = $Wavelength  # m
wave_speed = frequency * wavelength
period = 1 / frequency if frequency > 0 else 0

print(f"Wave Analysis:")
print(f"Frequency: {frequency} Hz")
print(f"Wavelength: {wavelength} m")
print(f"Wave Speed: {wave_speed:.2f} m/s")
print(f"Period: {period:.4f} s")
```

### Chemistry Calculations
```python
# Chemistry Calculations
compound_name = "$CompoundName"
molecular_formula = "$MolecularFormula"
molar_mass = $MolarMass  # g/mol

# Stoichiometry
reactant_mass = $ReactantMass  # grams
product_molar_mass = $ProductMolarMass  # g/mol
stoichiometric_ratio = $StoichiometricRatio  # mol product per mol reactant

# Calculate moles and theoretical yield
reactant_moles = reactant_mass / molar_mass
product_moles_theoretical = reactant_moles * stoichiometric_ratio
theoretical_yield = product_moles_theoretical * product_molar_mass

# Percent yield calculation
actual_yield = $ActualYield  # grams
percent_yield = (actual_yield / theoretical_yield) * 100 if theoretical_yield > 0 else 0

# Solution concentration
solution_volume = $SolutionVolume  # liters
solute_moles = $SoluteMoles  # moles
molarity = solute_moles / solution_volume if solution_volume > 0 else 0

print(f"Chemistry Calculations: {compound_name}")
print(f"Molecular Formula: {molecular_formula}")
print(f"Molar Mass: {molar_mass} g/mol")
print(f"")
print(f"Stoichiometry Analysis:")
print(f"Reactant Mass: {reactant_mass} g")
print(f"Reactant Moles: {reactant_moles:.4f} mol")
print(f"Theoretical Yield: {theoretical_yield:.2f} g")
print(f"Actual Yield: {actual_yield} g")
print(f"Percent Yield: {percent_yield:.1f}%")
print(f"")
print(f"Solution Analysis:")
print(f"Solution Volume: {solution_volume} L")
print(f"Solute Moles: {solute_moles} mol")
print(f"Molarity: {molarity:.3f} M")
```

## 💡 Usage Tips for Data Analysis

1. **Set Default Values**: Use common values for your field (e.g., α=0.05, confidence=95%)
2. **Save Analysis Templates**: Reuse variable templates for similar analyses
3. **Document Assumptions**: Include variable descriptions in your notes
4. **Version Control**: Track different analysis scenarios with variables

## 🎯 Suggested Variable Values

**Financial Analysis:**
- `AnnualReturnRate`: 7, 10, 12 (percentage)
- `InvestmentPeriodYears`: 5, 10, 20, 30
- `ConfidenceLevel`: 90, 95, 99

**Statistical Tests:**
- `SignificanceLevel`: 0.01, 0.05, 0.10
- `SampleSize`: 30, 100, 500, 1000
- `RandomSeed`: 42, 123, 2024

**Business Metrics:**
- `AnalysisPeriod`: Q1 2024, Monthly, Annual
- `ChurnRate`: 5, 10, 15 (percentage) 