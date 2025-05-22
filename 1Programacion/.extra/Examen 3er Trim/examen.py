import re
import xml.etree.ElementTree as ET
from xml.etree.ElementTree import Element, SubElement, tostring
from xml.dom import minidom

"""
EXAM REQUIREMENT: Create a Python class to manage an address book of up to 100 contacts (limited to 5 for testing).
This solution implements:
1. Contact class with validation
2. AddressBook class with XML import/export
3. Custom exceptions
4. Test program with menu interface
"""

# ========================
# SECTION 1: CUSTOM EXCEPTIONS
# ========================
"""REQUIREMENT: The system must throw specialized exceptions for different error cases."""

class ContactValidationError(Exception):
    """Raised when contact data (name, phone, email) is invalid"""
    pass

class DuplicateContactError(Exception):
    """REQUIREMENT: Exception for duplicate contact names"""
    pass

class ContactNotFoundError(Exception):
    """REQUIREMENT: Exception when contact doesn't exist"""
    pass

class AddressBookFullError(Exception):
    """REQUIREMENT: Exception when exceeding max contacts (5 for testing)"""
    pass

class FileOperationError(Exception):
    """REQUIREMENT: Exception for file operations (XML load/save)"""
    pass

# ========================
# SECTION 2: CONTACT CLASS
# ========================
"""REQUIREMENT: Contact class with:
- Two constructors (with/without address)
- Validation using regex
- Properties for get/set operations
- XML serialization capabilities
"""

class Contact:
    def __init__(self, name, phone, email, address=None):
        """REQUIREMENT: First constructor (address optional)"""
        self._name = None
        self._phone = None
        self._email = None
        self._address = address
        
        # Validate and set properties
        self.name = name
        self.phone = phone
        self.email = email
    
    # === PROPERTIES WITH VALIDATION ===
    @property
    def name(self):
        return self._name
    
    @name.setter
    def name(self, value):
        """REQUIREMENT: Name validation - not empty"""
        if not value or not value.strip():
            raise ContactValidationError("Name cannot be empty")
        self._name = value.strip()
    
    @property
    def phone(self):
        return self._phone
    
    @phone.setter
    def phone(self, value):
        """REQUIREMENT: Phone validation - 9 digits starting with 6,7,9"""
        if not re.match(r'^[679]\d{8}$', str(value)):
            raise ContactValidationError("Phone must be 9 digits starting with 6, 7, or 9")
        self._phone = value
    
    @property
    def email(self):
        return self._email
    
    @email.setter
    def email(self, value):
        """REQUIREMENT: Email validation - one @ with . after"""
        if not re.match(r'^[^@]+@[^@]+\.[^@]+$', value):
            raise ContactValidationError("Email must contain exactly one @ and at least one . after it")
        self._email = value
    
    @property
    def address(self):
        return self._address
    
    @address.setter
    def address(self, value):
        """REQUIREMENT: Address has no validation"""
        self._address = value
    
    # === XML SERIALIZATION ===
    def to_xml_element(self):
        """REQUIREMENT: Convert contact to XML element"""
        contact_elem = Element("contact")
        SubElement(contact_elem, "name").text = self.name
        SubElement(contact_elem, "phone").text = self.phone
        SubElement(contact_elem, "email").text = self.email
        if self.address:
            SubElement(contact_elem, "address").text = self.address
        return contact_elem
    
    @classmethod
    def from_xml_element(cls, elem):
        """REQUIREMENT: Create contact from XML element"""
        name = elem.find("name").text
        phone = elem.find("phone").text
        email = elem.find("email").text
        address_elem = elem.find("address")
        address = address_elem.text if address_elem is not None else None
        return cls(name, phone, email, address)
    
    def __str__(self):
        """User-friendly string representation"""
        return f"Name: {self.name}, Phone: {self.phone}, Email: {self.email}, Address: {self.address or 'N/A'}"

# ========================
# SECTION 3: ADDRESSBOOK CLASS
# ========================
"""REQUIREMENT: AddressBook class that:
- Manages up to 5 contacts (for testing)
- Supports XML import/export
- Provides contact management methods
"""

class AddressBook:
    MAX_CONTACTS = 5  # REQUIREMENT: Limit to 5 for testing
    
    def __init__(self, xml_file=None):
        """REQUIREMENT: Two constructors (empty or from XML)"""
        self.contacts = []
        
        if xml_file:
            try:
                tree = ET.parse(xml_file)
                root = tree.getroot()
                
                for contact_elem in root.findall("contact"):
                    contact = Contact.from_xml_element(contact_elem)
                    self._add_contact_internal(contact)
            except Exception as e:
                raise FileOperationError(f"Error loading XML file: {str(e)}")
    
    def _add_contact_internal(self, contact):
        """Internal method with capacity and duplicate checks"""
        if len(self.contacts) >= self.MAX_CONTACTS:
            raise AddressBookFullError(f"Cannot exceed maximum of {self.MAX_CONTACTS} contacts")
        
        if any(c.name.lower() == contact.name.lower() for c in self.contacts):
            raise DuplicateContactError(f"Contact with name '{contact.name}' already exists")
        
        self.contacts.append(contact)
    
    def add_contact(self, name, phone, email, address=None):
        """REQUIREMENT: Add contact with validation"""
        contact = Contact(name, phone, email, address)
        self._add_contact_internal(contact)
        return contact
    
    def remove_contact(self, name):
        """REQUIREMENT: Remove contact by name"""
        contact = self.find_contact(name)
        if not contact:
            raise ContactNotFoundError(f"Contact with name '{name}' not found")
        self.contacts.remove(contact)
        return contact
    
    def find_contact(self, name):
        """REQUIREMENT: Find contact by name (case-insensitive)"""
        name_lower = name.lower()
        for contact in self.contacts:
            if contact.name.lower() == name_lower:
                return contact
        return None
    
    def list_contacts(self):
        """REQUIREMENT: Get all contacts"""
        return self.contacts.copy()
    
    def export_to_xml(self, filename):
        """REQUIREMENT: Export contacts to XML file"""
        try:
            root = Element("addressbook")
            
            for contact in self.contacts:
                contact_elem = contact.to_xml_element()
                root.append(contact_elem)
            
            # Pretty print XML
            xml_str = minidom.parseString(tostring(root)).toprettyxml(indent="  ")
            
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(xml_str)
        except Exception as e:
            raise FileOperationError(f"Error exporting to XML: {str(e)}")

# ========================
# SECTION 4: TEST PROGRAM
# ========================
"""REQUIREMENT: Menu-driven test program that allows:
- Creating address book from XML
- Adding/removing contacts
- Searching/listing
- Exporting to XML
"""

def display_menu():
    print("\nAddress Book Menu:")
    print("1. Create new empty address book")
    print("2. Create address book from XML file")
    print("3. Add contact")
    print("4. Remove contact")
    print("5. Find contact")
    print("6. List all contacts")
    print("7. Export to XML")
    print("8. Exit")

def main():
    address_book = None
    
    while True:
        display_menu()
        choice = input("Enter your choice (1-8): ")
        
        try:
            if choice == "1":
                address_book = AddressBook()
                print("New empty address book created.")
            
            elif choice == "2":
                if address_book and address_book.list_contacts():
                    confirm = input("Current address book has contacts. Overwrite? (y/n): ")
                    if confirm.lower() != 'y':
                        continue
                filename = input("Enter XML filename: ")
                address_book = AddressBook(filename)
                print(f"Address book loaded from {filename}")
            
            elif choice == "3":
                if not address_book:
                    print("Please create or load an address book first.")
                    continue
                
                print("\nAdd New Contact:")
                name = input("Name: ")
                phone = input("Phone (9 digits starting with 6,7,9): ")
                email = input("Email: ")
                address = input("Address (optional): ") or None
                
                contact = address_book.add_contact(name, phone, email, address)
                print(f"Contact added: {contact}")
            
            elif choice == "4":
                if not address_book:
                    print("Please create or load an address book first.")
                    continue
                
                name = input("Enter name of contact to remove: ")
                contact = address_book.remove_contact(name)
                print(f"Contact removed: {contact}")
            
            elif choice == "5":
                if not address_book:
                    print("Please create or load an address book first.")
                    continue
                
                name = input("Enter name of contact to find: ")
                contact = address_book.find_contact(name)
                if contact:
                    print("Contact found:")
                    print(contact)
                else:
                    print("Contact not found.")
            
            elif choice == "6":
                if not address_book:
                    print("Please create or load an address book first.")
                    continue
                
                contacts = address_book.list_contacts()
                if not contacts:
                    print("Address book is empty.")
                else:
                    print("\nAll Contacts:")
                    for i, contact in enumerate(contacts, 1):
                        print(f"{i}. {contact}")
            
            elif choice == "7":
                if not address_book:
                    print("Please create or load an address book first.")
                    continue
                
                filename = input("Enter XML filename to export to: ")
                address_book.export_to_xml(filename)
                print(f"Address book exported to {filename}")
            
            elif choice == "8":
                print("Exiting program.")
                break
            
            else:
                print("Invalid choice. Please enter a number between 1 and 8.")
        
        except ContactValidationError as e:
            print(f"Validation error: {e}")
        except DuplicateContactError as e:
            print(f"Error: {e}")
        except ContactNotFoundError as e:
            print(f"Error: {e}")
        except AddressBookFullError as e:
            print(f"Error: {e}")
        except FileOperationError as e:
            print(f"File error: {e}")
        except Exception as e:
            print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    main()