// NO AXIOS - PURE MOCK DATA ONLY
export const resourceMembersAPI = {
  mockMembers: [
    {
      id: 1,
      resourceName: "Rajesh Kumar",
      fatherHusbandName: "Ramesh Kumar",
      gender: 1,
      emailAddress: "rajesh@example.com",
      mobileNo: 9876543210,
      district: 101,
      block: 201,
      designationId: 5
    },
    {
      id: 2,
      resourceName: "Suresh Kumari",
      fatherHusbandName: "Mahesh Kumar", 
      gender: 2,
      emailAddress: "ksuresh@example.com",
      mobileNo: 9876543211,
      district: 102,
      block: 202,
      designationId: 6
    }
  ],

  async create(data) {
    console.log('🟢 CREATE:', data);
    const newMember = { 
      id: Date.now(), 
      fpoId: 1,
      resourceName: data.resourceName,
	  fatherHusbandName: data.fatherHusbandName,
	  gender: data.gender,
	  emailAddress: data.emailAddress,
	  mobileNo: data.mobileNo,
	  district: data.district,
	  block: data.block,
	  designationId: data.designationId
    };
    this.mockMembers.unshift(newMember); 
    return { success: true, data: newMember };
  },

  async getList(fpoId) {
    console.log('🔵 LIST:', fpoId);
    return { 
      success: true, 
      data: this.mockMembers 
    };
  },

  async update(id, data) {
    console.log('🟡 UPDATE:', id, data);
    const index = this.mockMembers.findIndex(m => m.id === id);
    if (index !== -1) {
      this.mockMembers[index] = { ...this.mockMembers[index], 
	  resourceName: data.resourceName,
	  fatherHusbandName: data.fatherHusbandName,
	  gender: data.gender,
	  emailAddress: data.emailAddress,
	  mobileNo: data.mobileNo,
	  district: data.district,
	  block: data.block,
	  designationId: data.designationId 
	  };
    }
    return { success: true, message: 'Updated successfully' };
  },

  async delete(id) {
    console.log('🔴 DELETE:', id);
    const index = this.mockMembers.findIndex(m => m.id === id);
    if (index !== -1) {
      this.mockMembers.splice(index, 1);
    }
    return { success: true, message: 'Deleted successfully' };
  }
};
