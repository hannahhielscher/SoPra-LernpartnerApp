from server.bo.NamedBusinessObject import NamedBusinessObject


class Konversation (NamedBusinessObject):
    
    def __init__(self):
        super().__init__()

    
    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Konversation()
        obj.set_id(dictionary["id"])  # part of the Business object mother class
        obj.set_name(dictionary["name"])

        return obj

    