/**
 * Example (c) by Ibtisam Raheem
 *
 * Example is licensed under a
 * Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License.
 *
 * You should have received a copy of the license along with this
 * work.  If not, see <http://creativecommons.org/licenses/by-nc-nd/3.0/>.
 */
export const validEmail = new RegExp(
  "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
);
export const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$");

export const validName = new RegExp("([a-zA-Z][-,a-z.', 0-9]+[ ]*)+$");

export const validUserName = new RegExp("([a-zA-Z@][-,a-z.', 0-9]+[ ]*)+$");

export const detectLink = new RegExp(
  "(http|ftp|https)://([w_-]+(?:(?:.[w_-]+)+))([w.,@?^=%&:/~+#-]*[w@?^=%&/~+#-])"
);

export const detectLink2 = new RegExp(
  "/(\b(https?|ftp|file|)://[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig"
);
