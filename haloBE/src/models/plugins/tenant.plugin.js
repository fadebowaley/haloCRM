/* eslint-disable no-param-reassign */

const tenantPlugin = (schema) => {
  function applyTenantFilter(next) {
    console.log('[TenantPlugin] Pre-hook triggered for:', this.op);
    console.log('[TenantPlugin] Options:', this.options);

    const user = this.options?.user;
    if (user?.isOwner && !user?.isSuper) {
      console.log('[TenantPlugin] Applying tenantId filter:', user.tenantId);
      this.setQuery({
        ...this.getQuery(),
        tenantId: user.tenantId,
      });
    }
    next();
  }

  schema.pre('find', applyTenantFilter);
  schema.pre('findOne', applyTenantFilter);
  schema.pre('count', applyTenantFilter);
  schema.pre('countDocuments', applyTenantFilter);

  const originalPaginate = schema.statics.paginate;

  schema.statics.paginate = async function (filter = {}, options = {}) {
    console.log('[TenantPlugin] paginate() - incoming options:', options);
    const user = options.user;

    if (user?.isOwner && !user?.isSuper) {
      console.log('[TenantPlugin] Adding tenantId to filter:', user.tenantId);
      console.log('[TenantPlugin] Adding tenantId to user:', user);
      filter = { ...filter, tenantId: user.tenantId };
    }

    return originalPaginate.call(this, filter, options);
  };
};

module.exports = tenantPlugin;
