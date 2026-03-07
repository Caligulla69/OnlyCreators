import { useState, useCallback, memo, useEffect } from "react";
import {
  IoPersonOutline,
  IoLinkOutline,
  IoNotificationsOutline,
  IoColorPaletteOutline,
  IoShieldOutline,
  IoLogoYoutube,
  IoLogoInstagram,
  IoLogoTiktok,
  IoCamera,
  IoCheckmarkCircle,
  IoWarning,
  IoSparkles,
  IoSaveOutline,
} from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import Modal from "../components/common/Modal";

const TabButton = memo(({ active, icon: Icon, label, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`
      relative flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-300 w-full group
      ${
        active
          ? "bg-primary-700 text-white shadow-lg shadow-primary-900/25"
          : "text-text-secondary dark:text-dark-text-muted hover:bg-surface-100 dark:hover:bg-dark-surface-light hover:text-text-primary dark:hover:text-dark-text"
      }
    `}
  >
    <Icon
      className={`w-5 h-5 flex-shrink-0 ${active ? "" : "group-hover:scale-110 transition-transform"}`}
    />
    <span className="flex-1 text-left">{label}</span>
    {badge && (
      <span
        className={`px-2 py-0.5 text-xs font-bold rounded-full ${
          active ? "bg-white/20 text-white" : "bg-error-100 text-error-700"
        }`}
      >
        {badge}
      </span>
    )}
    {active && (
      <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-full shadow-lg" />
    )}
  </button>
));

const Toggle = memo(({ checked, onChange, disabled = false }) => (
  <button
    type="button"
    onClick={() => !disabled && onChange(!checked)}
    disabled={disabled}
    className={`
      relative w-14 h-7 rounded-full transition-all duration-300 shadow-inner
      ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      ${checked ? "bg-primary-700 " : "bg-surface-300 dark:bg-dark-surface-light"}
    `}
  >
    <span
      className={`
        absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-300
        ${checked ? "left-8" : "left-1"}
      `}
    />
  </button>
));

const NotificationItem = memo(({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between py-4 border-b border-surface-200 dark:border-dark-border last:border-0 group hover:bg-surface-50 dark:hover:bg-dark-surface-light -mx-4 px-4 transition-colors">
    <div className="flex-1 pr-4">
      <p className="font-semibold text-text-primary dark:text-dark-text group-hover:text-primary-900 dark:group-hover:text-primary-400 transition-colors">
        {label}
      </p>
      <p className="text-sm text-text-muted dark:text-dark-text-muted mt-0.5">
        {description}
      </p>
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
));

const ConnectedAccount = memo(
  ({ icon: Icon, name, description, connected, comingSoon, gradient }) => (
    <div
      className={`
        relative overflow-hidden flex items-center justify-between p-5 rounded-2xl border transition-all duration-300
        ${
          comingSoon
            ? "bg-surface-50 dark:bg-dark-surface border-surface-200 dark:border-dark-border opacity-70"
            : connected
              ? "bg-gradient-to-br from-surface-50 to-white dark:from-dark-surface dark:to-dark-surface-light border-success-200 dark:border-success-800 hover:border-success-300 dark:hover:border-success-700"
              : "bg-white dark:bg-dark-surface border-surface-300 dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md dark:hover:shadow-black/30"
        }
      `}
    >
      {connected && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-success-100 rounded-full -translate-y-10 translate-x-10 opacity-50" />
      )}
      <div className="flex items-center gap-4 relative">
        <div className={`p-3.5 rounded-xl ${gradient} shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="font-bold text-text-primary dark:text-dark-text">
            {name}
          </h4>
          <p className="text-sm text-text-muted dark:text-dark-text-muted">
            {description}
          </p>
        </div>
      </div>
      <div className="relative">
        {comingSoon ? (
          <Badge variant="neutral">Coming Soon</Badge>
        ) : connected ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success-100 rounded-full">
              <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-success-700">
                Connected
              </span>
            </div>
            <Button variant="ghost" size="sm">
              Disconnect
            </Button>
          </div>
        ) : (
          <Button size="sm">Connect</Button>
        )}
      </div>
    </div>
  ),
);

const Settings = () => {
  const { user, updateUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "Full-stack developer sharing coding tutorials and tech insights.",
    channelName: user?.channelName || "",
  });

  const [notifications, setNotifications] = useState({
    emailPerformance: true,
    emailTrending: true,
    emailWeekly: false,
    inAppAlerts: true,
    inAppInsights: true,
  });

  const [preferences, setPreferences] = useState({
    theme: theme,
    language: "en",
    timezone: "America/New_York",
  });

  // Handle theme change - update both local state and actual theme
  const handleThemeChange = useCallback(
    (newTheme) => {
      setPreferences((prev) => ({ ...prev, theme: newTheme }));
      if (newTheme === "system") {
        // Check system preference
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        setTheme(systemPrefersDark ? "dark" : "light");
      } else {
        setTheme(newTheme);
      }
    },
    [setTheme],
  );

  // Sync preferences.theme with actual theme on mount
  useEffect(() => {
    setPreferences((prev) => ({ ...prev, theme }));
  }, [theme]);

  const handleProfileSave = useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    updateUser(profile);
    setIsLoading(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  }, [profile, updateUser]);

  const tabs = [
    { id: "profile", label: "Profile", icon: IoPersonOutline },
    { id: "accounts", label: "Connected Accounts", icon: IoLinkOutline },
    {
      id: "notifications",
      label: "Notifications",
      icon: IoNotificationsOutline,
      badge: "2",
    },
    { id: "preferences", label: "Preferences", icon: IoColorPaletteOutline },
    { id: "security", label: "Security", icon: IoShieldOutline },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="bg-white dark:bg-dark-surface rounded-2xl border border-surface-300 dark:border-dark-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-surface-200 dark:border-dark-border">
              <h2 className="text-xl font-bold text-text-primary dark:text-dark-text">
                Profile Settings
              </h2>
              <p className="text-sm text-text-muted dark:text-dark-text-muted mt-1">
                Manage your public profile information
              </p>
            </div>
            <div className="p-6 space-y-6">
              {/* Success Message */}
              {saveSuccess && (
                <div className="flex items-center gap-3 p-4 bg-success-50 dark:bg-success-900/30 border border-success-200 dark:border-success-800 rounded-xl text-success-700 dark:text-success-400 animate-fade-in">
                  <IoCheckmarkCircle className="w-5 h-5" />
                  <span className="font-medium">
                    Profile updated successfully!
                  </span>
                </div>
              )}

              {/* Profile Picture */}
              <div className="relative flex flex-col sm:flex-row items-center gap-6 p-6 bg-gradient-to-br from-surface-50 to-surface-100 dark:from-dark-surface-light dark:to-dark-surface rounded-2xl border border-surface-200 dark:border-dark-border">
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-full opacity-50 blur-2xl" />
                <div className="relative group">
                  <img
                    src={
                      user?.profilePicture || "https://via.placeholder.com/120"
                    }
                    alt={user?.name}
                    className="w-28 h-28 rounded-2xl object-cover border-4 border-white dark:border-dark-surface shadow-xl"
                  />
                  <button className="absolute inset-0 bg-dark-900/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <IoCamera className="w-8 h-8 text-white" />
                  </button>
                  <div className="absolute -bottom-2 -right-2 p-2 bg-primary-900 rounded-full shadow-lg">
                    <IoSparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold text-text-primary dark:text-dark-text">
                    {user?.name}
                  </h3>
                  <p className="text-text-muted dark:text-dark-text-muted">
                    {user?.email}
                  </p>
                  <button className="mt-3 text-sm font-semibold text-primary-900 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                    Change profile photo →
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                />
                <Input
                  label="Email"
                  type="email"
                  value={profile.email}
                  disabled
                  helperText="Email cannot be changed"
                />
              </div>

              <Input
                label="Channel Name"
                value={profile.channelName}
                onChange={(e) =>
                  setProfile({ ...profile, channelName: e.target.value })
                }
                placeholder="Your YouTube channel name"
              />

              <div>
                <label className="block text-sm font-semibold text-text-primary dark:text-dark-text mb-2">
                  Bio
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-surface-300 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-900 dark:focus:ring-primary-500 focus:border-transparent resize-none transition-all text-text-primary dark:text-dark-text bg-white dark:bg-dark-surface-light"
                  placeholder="Tell us about yourself..."
                />
                <p className="mt-2 text-xs text-text-muted dark:text-dark-text-muted">
                  {profile.bio.length}/500 characters
                </p>
              </div>

              <div className="flex justify-end pt-4 border-t border-surface-200 dark:border-dark-border">
                <Button
                  onClick={handleProfileSave}
                  isLoading={isLoading}
                  leftIcon={<IoSaveOutline className="w-4 h-4" />}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        );

      case "accounts":
        return (
          <div className="bg-white dark:bg-dark-surface rounded-2xl border border-surface-300 dark:border-dark-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-surface-200 dark:border-dark-border">
              <h2 className="text-xl font-bold text-text-primary dark:text-dark-text">
                Connected Platforms
              </h2>
              <p className="text-sm text-text-muted dark:text-dark-text-muted mt-1">
                Manage your connected social media accounts
              </p>
            </div>
            <div className="p-6 space-y-4">
              <ConnectedAccount
                icon={IoLogoYoutube}
                name="YouTube"
                description={
                  user?.connectedAccounts?.youtube
                    ? `Connected as ${user.channelName}`
                    : "Not connected"
                }
                connected={user?.connectedAccounts?.youtube}
                gradient="bg-gradient-to-br from-red-500 to-red-600"
              />
              <ConnectedAccount
                icon={IoLogoInstagram}
                name="Instagram"
                description="Coming soon"
                comingSoon
                gradient="bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400"
              />
              <ConnectedAccount
                icon={IoLogoTiktok}
                name="TikTok"
                description="Coming soon"
                comingSoon
                gradient="bg-gradient-to-br from-dark-900 to-dark-800"
              />
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="bg-white dark:bg-dark-surface rounded-2xl border border-surface-300 dark:border-dark-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-surface-200 dark:border-dark-border">
              <h2 className="text-xl font-bold text-text-primary dark:text-dark-text">
                Notification Preferences
              </h2>
              <p className="text-sm text-text-muted dark:text-dark-text-muted mt-1">
                Choose what updates you want to receive
              </p>
            </div>
            <div className="p-6 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <IoNotificationsOutline className="w-4 h-4 text-primary-900 dark:text-primary-400" />
                  </div>
                  <h3 className="font-bold text-text-primary dark:text-dark-text">
                    Email Notifications
                  </h3>
                </div>
                <div className="bg-surface-50 dark:bg-dark-surface-light rounded-xl p-4 border border-surface-200 dark:border-dark-border">
                  <NotificationItem
                    label="Performance Milestones"
                    description="Get notified when your videos hit milestones"
                    checked={notifications.emailPerformance}
                    onChange={(v) =>
                      setNotifications({
                        ...notifications,
                        emailPerformance: v,
                      })
                    }
                  />
                  <NotificationItem
                    label="Trending Opportunities"
                    description="Alerts about trending topics in your niche"
                    checked={notifications.emailTrending}
                    onChange={(v) =>
                      setNotifications({ ...notifications, emailTrending: v })
                    }
                  />
                  <NotificationItem
                    label="Weekly Summary"
                    description="Weekly digest of your channel performance"
                    checked={notifications.emailWeekly}
                    onChange={(v) =>
                      setNotifications({ ...notifications, emailWeekly: v })
                    }
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
                    <IoSparkles className="w-4 h-4 text-accent-700 dark:text-accent-400" />
                  </div>
                  <h3 className="font-bold text-text-primary dark:text-dark-text">
                    In-App Notifications
                  </h3>
                </div>
                <div className="bg-surface-50 dark:bg-dark-surface-light rounded-xl p-4 border border-surface-200 dark:border-dark-border">
                  <NotificationItem
                    label="Real-time Alerts"
                    description="Instant notifications for important events"
                    checked={notifications.inAppAlerts}
                    onChange={(v) =>
                      setNotifications({ ...notifications, inAppAlerts: v })
                    }
                  />
                  <NotificationItem
                    label="Insight Updates"
                    description="Notifications when new insights are available"
                    checked={notifications.inAppInsights}
                    onChange={(v) =>
                      setNotifications({ ...notifications, inAppInsights: v })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "preferences":
        return (
          <div className="bg-white dark:bg-dark-surface rounded-2xl border border-surface-300 dark:border-dark-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-surface-200 dark:border-dark-border">
              <h2 className="text-xl font-bold text-text-primary dark:text-dark-text">
                App Preferences
              </h2>
              <p className="text-sm text-text-muted dark:text-dark-text-muted mt-1">
                Customize your experience
              </p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-text-primary dark:text-dark-text mb-3">
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {["light", "dark", "system"].map((themeOption) => (
                    <button
                      key={themeOption}
                      onClick={() => handleThemeChange(themeOption)}
                      className={`
                        relative px-4 py-4 rounded-xl border-2 text-sm font-semibold capitalize transition-all duration-300
                        ${
                          preferences.theme === themeOption
                            ? "border-primary-900 dark:border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-900 dark:text-primary-300 shadow-lg shadow-primary-900/10"
                            : "border-surface-300 dark:border-dark-border text-text-secondary dark:text-dark-text-muted hover:border-surface-400 dark:hover:border-dark-border hover:bg-surface-50 dark:hover:bg-dark-surface-light"
                        }
                      `}
                    >
                      {preferences.theme === themeOption && (
                        <IoCheckmarkCircle className="absolute top-2 right-2 w-5 h-5 text-primary-900 dark:text-primary-400" />
                      )}
                      {themeOption}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary dark:text-dark-text mb-2">
                  Language
                </label>
                <select
                  value={preferences.language}
                  onChange={(e) =>
                    setPreferences({ ...preferences, language: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-surface-300 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-900 dark:focus:ring-primary-500 bg-white dark:bg-dark-surface-light text-text-primary dark:text-dark-text"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary dark:text-dark-text mb-2">
                  Timezone
                </label>
                <select
                  value={preferences.timezone}
                  onChange={(e) =>
                    setPreferences({ ...preferences, timezone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-surface-300 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-900 dark:focus:ring-primary-500 bg-white dark:bg-dark-surface-light text-text-primary dark:text-dark-text"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="Europe/London">GMT</option>
                </select>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-surface-300 dark:border-dark-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-surface-200 dark:border-dark-border">
                <h2 className="text-xl font-bold text-text-primary dark:text-dark-text">
                  Change Password
                </h2>
                <p className="text-sm text-text-muted dark:text-dark-text-muted mt-1">
                  Update your account password
                </p>
              </div>
              <div className="p-6 space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="••••••••"
                />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="••••••••"
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="••••••••"
                />
                <div className="flex justify-end pt-2">
                  <Button>Update Password</Button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-surface rounded-2xl border border-surface-300 dark:border-dark-border shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="relative overflow-hidden p-6 bg-gradient-to-br from-error-50 to-warning-50 dark:from-error-900/30 dark:to-warning-900/30 border border-error-200 dark:border-error-800 rounded-xl">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-error-100 dark:bg-error-900/50 rounded-full opacity-50 blur-2xl" />
                  <div className="relative flex items-start gap-4">
                    <div className="p-3 bg-error-100 dark:bg-error-900/50 rounded-xl shadow-lg">
                      <IoWarning className="w-6 h-6 text-error-600 dark:text-error-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-error-800 dark:text-error-300 mb-1">
                        Danger Zone
                      </h4>
                      <p className="text-sm text-error-700 dark:text-error-400 mb-4">
                        Once you delete your account, there is no going back.
                        Please be certain.
                      </p>
                      <Button
                        variant="danger"
                        onClick={() => setShowDeleteModal(true)}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="relative">
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-primary-600 to-accent-700 rounded-2xl shadow-lg">
              <IoSparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary dark:text-dark-text">
              Settings
            </h1>
          </div>
          <p className="text-text-muted dark:text-dark-text-muted ml-16">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-dark-surface rounded-2xl border border-surface-300 dark:border-dark-border shadow-sm p-4 space-y-2 sticky top-24">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                icon={tab.icon}
                label={tab.label}
                badge={tab.badge}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 animate-fade-in" key={activeTab}>
          {renderContent()}
        </div>
      </div>

      {/* Delete Account Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger">Yes, Delete My Account</Button>
          </>
        }
      >
        <div className="text-center py-6">
          <div className="w-20 h-20 bg-error-100 dark:bg-error-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-error-500/20">
            <IoWarning className="w-10 h-10 text-error-600 dark:text-error-400" />
          </div>
          <h3 className="text-xl font-bold text-text-primary dark:text-dark-text mb-3">
            Are you absolutely sure?
          </h3>
          <p className="text-text-muted dark:text-dark-text-muted max-w-sm mx-auto">
            This action cannot be undone. All your data, insights, and connected
            accounts will be permanently deleted.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default memo(Settings);
