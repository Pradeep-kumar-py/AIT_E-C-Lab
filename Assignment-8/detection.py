import re
from collections import defaultdict

log_file = "logs.txt"

failed_logins = defaultdict(int)
sql_injection_attempts = []

# Regex patterns
ip_pattern = r"(\d+\.\d+\.\d+\.\d+)"
status_pattern = r"\" (\d{3})"
sqli_pattern = r"(OR\s+1=1|\'\s*OR\s*\'a\'=\'a)"

with open(log_file, "r") as file:
    for line in file:
        ip = re.search(ip_pattern, line).group()
        status = re.search(status_pattern, line).group(1)

        # Detect failed login
        if "/login" in line and status == "401":
            failed_logins[ip] += 1

        # Detect SQL injection
        if re.search(sqli_pattern, line, re.IGNORECASE):
            sql_injection_attempts.append((ip, line.strip()))

# 🚨 Print Results
print("=== Suspicious Activity Report ===\n")

print("🔴 Repeated Failed Logins:")
for ip, count in failed_logins.items():
    if count >= 3:
        print(f"{ip} → {count} failed attempts")

print("\n💉 SQL Injection Attempts:")
for ip, log in sql_injection_attempts:
    print(f"{ip} → {log}")