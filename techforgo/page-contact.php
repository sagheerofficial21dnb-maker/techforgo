<?php
/**
 * Template Name: Contact Us
 * Description: Dedicated Contact Us page displaying direct email, phone, and editorial form.
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
						<span class="tfg-category-label"><?php esc_html_e( 'Direct Editorial Communication', 'techforgo' ); ?></span>
						<h1 class="tfg-archive-title"><?php esc_html_e( 'Contact TechForGo', 'techforgo' ); ?></h1>
						<p class="tfg-archive-description">
							<?php esc_html_e( 'Have an inquiry, manuscript submission, or correction? Reach our editorial desk directly via email, phone, or our communication form below.', 'techforgo' ); ?>
						</p>
					</header>

					<!-- Direct Contact Cards -->
					<div class="tfg-contact-cards" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 32px;">
						<div class="tfg-contact-card" style="padding: 20px; background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 8px;">
							<span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #0066CC; display: block; margin-bottom: 6px;">
								<?php esc_html_e( 'Direct Email Desk', 'techforgo' ); ?>
							</span>
							<a href="mailto:info@techforgo.com" style="font-size: 15px; font-weight: 700; color: #1A1A1A; word-break: break-all; display: block; margin-bottom: 6px;">
								info@techforgo.com
							</a>
							<p style="font-size: 12px; color: #666666; margin: 0;">
								<?php esc_html_e( 'Monitored daily for editorial inquiries, submissions, and feedback.', 'techforgo' ); ?>
							</p>
						</div>

						<div class="tfg-contact-card" style="padding: 20px; background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 8px;">
							<span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #0066CC; display: block; margin-bottom: 6px;">
								<?php esc_html_e( 'Telephone / Helpline', 'techforgo' ); ?>
							</span>
							<a href="tel:03069256639" style="font-size: 15px; font-weight: 700; color: #1A1A1A; display: block; margin-bottom: 6px;">
								03069256639
							</a>
							<p style="font-size: 12px; color: #666666; margin: 0;">
								<?php esc_html_e( 'Available during business hours (Mon–Fri, 9:00 AM – 6:00 PM).', 'techforgo' ); ?>
							</p>
						</div>
					</div>

					<!-- Clean Form Container -->
					<div class="tfg-contact-form-wrap" style="padding: 24px; background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 8px;">
						<h2 style="font-size: 18px; font-weight: 700; margin-top: 0; margin-bottom: 6px;"><?php esc_html_e( 'Send a Direct Message', 'techforgo' ); ?></h2>
						<p style="font-size: 13px; color: #666666; margin-bottom: 20px;"><?php esc_html_e( 'We typically review and respond to inquiries within 24–48 business hours.', 'techforgo' ); ?></p>

						<form class="tfg-contact-form" onsubmit="event.preventDefault(); alert('Message successfully sent to info@techforgo.com.');">
							<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 16px;">
								<div>
									<label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 4px;"><?php esc_html_e( 'Your Name', 'techforgo' ); ?></label>
									<input type="text" required style="width: 100%; padding: 8px 12px; border: 1px solid #E5E5E5; border-radius: 4px; font-size: 14px;" />
								</div>
								<div>
									<label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 4px;"><?php esc_html_e( 'Your Email', 'techforgo' ); ?></label>
									<input type="email" required style="width: 100%; padding: 8px 12px; border: 1px solid #E5E5E5; border-radius: 4px; font-size: 14px;" />
								</div>
							</div>

							<div style="margin-bottom: 16px;">
								<label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 4px;"><?php esc_html_e( 'Subject', 'techforgo' ); ?></label>
								<select style="width: 100%; padding: 8px 12px; border: 1px solid #E5E5E5; border-radius: 4px; font-size: 14px;">
									<option><?php esc_html_e( 'Editorial Inquiry', 'techforgo' ); ?></option>
									<option><?php esc_html_e( 'Manuscript / Article Submission', 'techforgo' ); ?></option>
									<option><?php esc_html_e( 'Technical Correction / Errata', 'techforgo' ); ?></option>
									<option><?php esc_html_e( 'General Support', 'techforgo' ); ?></option>
								</select>
							</div>

							<div style="margin-bottom: 20px;">
								<label style="display: block; font-size: 12px; font-weight: 600; margin-bottom: 4px;"><?php esc_html_e( 'Message Details', 'techforgo' ); ?></label>
								<textarea rows="5" required style="width: 100%; padding: 8px 12px; border: 1px solid #E5E5E5; border-radius: 4px; font-size: 14px;"></textarea>
							</div>

							<button type="submit" style="padding: 10px 24px; background: #0066CC; color: #FFFFFF; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; border: none; border-radius: 4px; cursor: pointer;">
								<?php esc_html_e( 'Send Message', 'techforgo' ); ?>
							</button>
						</form>
					</div>

					<div class="tfg-article-prose" style="margin-top: 32px;">
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
