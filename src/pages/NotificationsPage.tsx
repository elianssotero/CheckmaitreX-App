
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell,
  Swords,
  Users,
  Trophy,
  Medal,
  Puzzle,
  GraduationCap,
  PlayCircle,
  ShieldCheck,
  ShoppingBag,
  Building2,
  LifeBuoy,
  X,
  CheckCheck,
  ChevronRight,
  Clock3,
  type LucideIcon,
} from 'lucide-react'
import './NotificationsPage.css'

type NotificationItem = {
  id: number
  category: string
  title: string
  message: string
  time: string
  date: 'Today' | 'Yesterday'
  icon: LucideIcon
  destination: string
  read: boolean
}

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    category: 'Chess & Gameplay',
    title: 'Chess Challenge',
    message: 'A player has challenged you to a chess game. Open the Play section to view your available game options.',
    time: '2 minutes ago',
    date: 'Today',
    icon: Swords,
    destination: '/play',
    read: false,
  },
  {
    id: 2,
    category: 'Friends & Community',
    title: 'New Friend Request',
    message: 'You received a new friend request. Visit your profile area to view this sample notification.',
    time: '15 minutes ago',
    date: 'Today',
    icon: Users,
    destination: '/profile',
    read: false,
  },
  {
    id: 3,
    category: 'Tournaments & Competitions',
    title: 'Tournament Registration Confirmed',
    message: 'Your tournament registration has been confirmed. Visit the tournament section to view the event.',
    time: '1 hour ago',
    date: 'Today',
    icon: Trophy,
    destination: '/play/tournaments',
    read: false,
  },
  {
    id: 4,
    category: 'Ratings & Achievements',
    title: 'Achievement Unlocked',
    message: 'You have reached a new chess milestone. Visit your profile to view your achievements.',
    time: '3 hours ago',
    date: 'Today',
    icon: Medal,
    destination: '/profile',
    read: false,
  },
  {
    id: 5,
    category: 'Puzzles & Training',
    title: 'Daily Puzzle Available',
    message: 'A new daily chess puzzle is available. Test your tactical skills in the Puzzles section.',
    time: '5 hours ago',
    date: 'Today',
    icon: Puzzle,
    destination: '/puzzles',
    read: true,
  },
  {
    id: 6,
    category: 'Learn & Education',
    title: 'New Chess Lesson',
    message: 'A new learning activity is available. Visit Learn to explore the lesson catalog.',
    time: 'Yesterday',
    date: 'Yesterday',
    icon: GraduationCap,
    destination: '/learn',
    read: true,
  },
  {
    id: 7,
    category: 'Watch, Events & News',
    title: 'New CCC Video',
    message: 'New chess video content has been added. Visit Watch to explore the video catalog.',
    time: 'Yesterday',
    date: 'Yesterday',
    icon: PlayCircle,
    destination: '/watch',
    read: true,
  },
  {
    id: 8,
    category: 'Membership & Account',
    title: 'Account Notice',
    message: 'There is an account information notice for you. Visit your profile to review your account details.',
    time: 'Yesterday',
    date: 'Yesterday',
    icon: ShieldCheck,
    destination: '/profile',
    read: true,
  },
  {
    id: 9,
    category: 'Official Store & Orders',
    title: 'Order Update',
    message: 'There is an update about your store order. Visit the More section to explore available store options.',
    time: 'Yesterday',
    date: 'Yesterday',
    icon: ShoppingBag,
    destination: '/more',
    read: true,
  },
  {
    id: 10,
    category: 'Company & Platform Announcements',
    title: 'Platform Announcement',
    message: 'There is a new platform announcement. Visit the Company section to view the information.',
    time: 'Yesterday',
    date: 'Yesterday',
    icon: Building2,
    destination: '/corporate',
    read: true,
  },
  {
    id: 11,
    category: 'Support & Help Center',
    title: 'Support Update',
    message: 'There is an update related to your support request. Visit More to access the available support area.',
    time: 'Yesterday',
    date: 'Yesterday',
    icon: LifeBuoy,
    destination: '/more',
    read: true,
  },
]

function NotificationsPage() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(initialNotifications)
  const [selected, setSelected] = useState<NotificationItem | null>(null)

  const unreadCount = notifications.filter((item) => !item.read).length

  const openNotification = (item: NotificationItem) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === item.id
          ? { ...notification, read: true }
          : notification,
      ),
    )

    setSelected({ ...item, read: true })
  }

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({ ...item, read: true })),
    )
  }

  const todayNotifications = notifications.filter(
    (item) => item.date === 'Today',
  )

  const yesterdayNotifications = notifications.filter(
    (item) => item.date === 'Yesterday',
  )

  const renderNotification = (item: NotificationItem) => {
    const Icon = item.icon

    return (
      <button
        className={`cx-notification-item ${item.read ? 'is-read' : 'is-unread'}`}
        key={item.id}
        onClick={() => openNotification(item)}
        type="button"
      >
        <span className="cx-notification-icon">
          <Icon size={21} />
        </span>

        <span className="cx-notification-copy">
          <span className="cx-notification-category">
            {item.category}
          </span>
          <strong>{item.title}</strong>
          <span className="cx-notification-message">
            {item.message}
          </span>
          <span className="cx-notification-time">
            <Clock3 size={12} />
            {item.time}
          </span>
        </span>

        <span className="cx-notification-indicator">
          {!item.read && <span className="cx-unread-dot" />}
          <ChevronRight size={17} />
        </span>
      </button>
    )
  }

  return (
    <div className="cx-notifications-page">
      <header className="cx-notifications-header">
        <button
          className="cx-notifications-back"
          type="button"
          aria-label="Go back"
          onClick={() => navigate(-1)}
        >
          <X size={21} />
        </button>

        <h1>Notifications</h1>

        <span className="cx-notifications-header-space" />
      </header>

      <main className="cx-notifications-content">
        <div className="cx-notifications-summary">
          <div>
            <span className="cx-notifications-overline">
              YOUR ACTIVITY
            </span>
            <p>
              {unreadCount > 0
                ? `${unreadCount} unread notifications`
                : 'You are all caught up'}
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              className="cx-mark-all-read"
              type="button"
              onClick={markAllAsRead}
            >
              <CheckCheck size={15} />
              Mark all read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="cx-notifications-empty">
            <span className="cx-notifications-empty-icon">
              <Bell size={30} />
            </span>
            <h2>No notifications yet</h2>
            <p>
              When you receive notifications, they will appear here.
            </p>
          </div>
        ) : (
          <>
            {todayNotifications.length > 0 && (
              <section className="cx-notification-group">
                <h2>Today</h2>
                <div className="cx-notification-list">
                  {todayNotifications.map(renderNotification)}
                </div>
              </section>
            )}

            {yesterdayNotifications.length > 0 && (
              <section className="cx-notification-group">
                <h2>Yesterday</h2>
                <div className="cx-notification-list">
                  {yesterdayNotifications.map(renderNotification)}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {selected && (
        <div className="cx-notification-modal-backdrop">
          <section
            className="cx-notification-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cx-notification-modal-title"
          >
            <div className="cx-notification-modal-top">
              <span className="cx-notification-modal-icon">
                <selected.icon size={23} />
              </span>

              <button
                className="cx-notification-modal-close"
                type="button"
                aria-label="Close notification"
                onClick={() => setSelected(null)}
              >
                <X size={19} />
              </button>
            </div>

            <span className="cx-notification-category">
              {selected.category}
            </span>

            <h2 id="cx-notification-modal-title">
              {selected.title}
            </h2>

            <p>{selected.message}</p>

            <span className="cx-notification-modal-time">
              <Clock3 size={13} />
              {selected.time}
            </span>

            <div className="cx-notification-modal-actions">
              <button
                className="cx-notification-modal-secondary"
                type="button"
                onClick={() => setSelected(null)}
              >
                Close
              </button>

              <button
                className="cx-notification-modal-primary"
                type="button"
                onClick={() => navigate(selected.destination)}
              >
                Open section
                <ChevronRight size={16} />
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default NotificationsPage
