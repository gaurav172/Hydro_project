
#TODO: Better conversion methods
def convert_to_num(text):
	"""Converts a text message to a list of numbers (their ascii codes)."""

	nums = []
	for character in text:
		nums.append(ord(character))
	return nums

def convert_to_text(nums):
	"""Converts a list of numbers to characters
	using numbers as their ascii code."""

	text = []
	for num in nums:
		text.append(chr(num))
	return ''.join(text)

def convert_text_to_binary(plaintext):
	"""Converts each character of plaintext to its ascii number,
	then converts ascii number to its 8-bit representation
	& concatenates for all characters."""
	
	nums = convert_to_num(plaintext)
	nums = [format(num, '08b') for num in nums]
	binary_string = ''.join(nums)
	return binary_string

def convert_binary_to_text(binary_string):
	"""Reverse of the above function."""

	ascii_text = []
	for i in range(0, len(binary_string), 8):  
		temp_data = binary_string[i : i + 8]  
		decimal_data = int(temp_data, 2) # converts 8-bit string to decimal
		ascii_text.append(decimal_data)
	return convert_to_text(ascii_text)
