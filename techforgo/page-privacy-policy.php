<?php
/**
 * Template Name: Privacy Policy
 * Description: Dedicated Privacy Policy compliance template covering cookies, AdSense, analytics, GDPR/CCPA.
 *
 * @package TechForGo
 * @since 1.0.2
 */

get_header();
?>

<main id="primary" class="tfg-site-main">
	<div class="tfg-container">
		<?php get_template_part( 'template-parts/breadcrumbs' ); ?>

		<div class="tfg-layout-split">
			<div class="tfg-main-content">
				<article id="post-<?php the_ID(); ?>" <?php post_class( 'tfg-legal-article' ); ?>>
					<header class="tfg-page-header">
						<span class="tfg-category-label"><?php esc_html_e( 'Compliance & Data Protection', 'techforgo' ); ?></span>
						<h1 class="tfg-archive-title"><?php esc_html_e( 'Privacy Policy', 'techforgo' ); ?></h1>
						<p class="tfg-archive-description">
							<?php esc_html_e( 'Last Updated: October 2026. This policy outlines our ethical standards regarding cookies, analytics, and user privacy rights.', 'techforgo' ); ?>
						</p>
					</header>

					<div class="tfg-article-prose">
						<h2><?php esc_html_e( '1. Introduction', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'At TechForGo, accessible from techforgo.com, one of our main priorities is the privacy of our visitors. This document details the types of information that is collected and recorded by TechForGo and how we use it.', 'techforgo' ); ?></p>

						<h2><?php esc_html_e( '2. Log Files & Analytics', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'TechForGo follows standard log file procedures. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks. These are not linked to any personally identifiable information.', 'techforgo' ); ?></p>

						<h2><?php esc_html_e( '3. Cookies & Google AdSense Advertising', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'Like any other website, TechForGo uses cookies to store information including visitors preferences, and the pages on the website that the visitor accessed or visited.', 'techforgo' ); ?></p>
						<p><?php esc_html_e( 'Google is one of our third-party vendors. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to techforgo.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at:', 'techforgo' ); ?> <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a></p>

						<h2><?php esc_html_e( '4. GDPR & CCPA Data Protection Rights', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to request copies of personal data, request correction, or request erasure under eligible statutory conditions.', 'techforgo' ); ?></p>

						<h2><?php esc_html_e( '5. Contact the Privacy Officer', 'techforgo' ); ?></h2>
						<p><?php esc_html_e( 'If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at sagheerofficial21dnb@gmail.com or by calling 03069256639.', 'techforgo' ); ?></p>

						<?php the_content(); ?>
					</div>
				</article>
			</div>

			<?php get_sidebar(); ?>
		</div>
	</div>
</main>

<?php
get_footer();
