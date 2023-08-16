export const INRFormatter = (number: number): string => {
  const formattedNumber = number.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  });

  return formattedNumber.replace(/^(\D+)/, '₹');
};
