//homeLocators.ts
export class HomePageLocators {
  static NAVIGATION_MENU = "nav.navigation";
  static SIDEBAR_FILTER = (filterLabel: string) => `#narrow-by-list2 a:has-text("${filterLabel}")`;
  static navMenuItem = (label: string): string => `text=${label}`;
}
